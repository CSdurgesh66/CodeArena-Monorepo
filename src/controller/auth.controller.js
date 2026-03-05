const { StatusCodes } = require('http-status-codes');
const { UserRepository } = require('../repository/index')
const { AuthService } = require('../services/index')

const authService = new AuthService(new UserRepository());

async function register(req, res, next) {
    try {
        const response = await authService.register(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Account created successfully",
            data: response,
            error: {}
        });

    } catch (error) {
        next(error);
    }
}

async function login(req, res, next) {
    try {

        const response = await authService.login(req.body);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'Login successful',
            data: response,
            error: {}
        });

    } catch (error) {
        next(error);
    }
}


async function getMe(req, res, next) {

    try {

        const user = await authService.getMe(req.user.id);
        return res.status(StatusCodes.OK).json({
            success: true,
            message: 'User fetched successfully',
            data: user,
            error: {}
        });

    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    getMe
}