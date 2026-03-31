const jwt = require('jsonwebtoken');
const BadRequestError = require('../errors/badrequest.error');
const { JWT_SECRET } = require('../config/server.config');


class AuthService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(userData) {
        const { username, email, password } = userData;
        if (!username || !email || !password) {
            throw new BadRequestError('register', 'username, email and password are required');
        }
        const existingEmail = await this.userRepository.findByEmail(email);
        if (existingEmail) {
            throw new BadRequestError('email', 'Account with this email already exists');
        }

        const existingUser = await this.userRepository.usernameExists(username);
        if (existingUser) {
            throw new BadRequestError('username', 'The username is  already taken');
        }

        const user = await this.userRepository.createUser({
            username,
            email,
            password,
            role: "user"
        });

        const token = this.generateToken(user);

        return { token, user: this.sanitize(user) }

    }


    async login(userData) {
        const { email, password } = userData;
        if (!email || !password) {
            throw new BadRequestError('login', 'email and password are required');
        }

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UnauthorizedError('Invalid email or password');
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            throw new UnauthorizedError('Invalid email or password');
        }

        const token = this.generateToken(user);

        return { token, user: this.sanitize(user) };

    }


    async getMe(userId) {
        const user = await this.userRepository.findById(userId);
        return user;
    }


    generateToken(user) {
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign(
            payload,
            JWT_SECRET,
            { expiresIn: "7d" }
        );

        return token;
    }

    sanitize(user) {
        return {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };
    }

}

module.exports = AuthService;