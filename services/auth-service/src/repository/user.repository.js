
const logger = require('../config/logger.config');
const NotFoundError = require('../errors/notfound.error');
const User = require('../models/user.model');


class UserRepository {

    async createUser(userData) {
        try {
            const user = await User.create({
                username: userData.username,
                email: userData.email,
                password: userData.password,
                role: userData.role || 'user',
            })
            return user;

        } catch (error) {
            logger.error(`UserRepository.createUser: ${error.message}`);
            throw error;
        }
    }


    async findByEmail(email) {
        try {
            return await User.findOne({ email });

        } catch (error) {
            logger.error(`UserRepository.findByEmail : ${error.message}`);
            throw error;
        }
    }

    async findById(id) {
        try {
            const user = await User.findById(id).select('-password');
            if (!user) throw new NotFoundError('User', id);
            return user;

        } catch (error) {
            logger.error(`UserRepository.findById ${error.message}`);
            throw error;
        }
    }
    async usernameExists(username) {
        try {
            const user = await User.findOne({ username });
            return !!user;
        } catch (error) {
            logger.error(`UserRepository.usernameExists: ${error.message}`);
            throw error;
        }
    }
}




module.exports = UserRepository;