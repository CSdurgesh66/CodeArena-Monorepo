const { StatusCodes } = require('http-status-codes');
const BaseError = require('./base.error');

class UnauthorizedError extends BaseError {
    constructor(details) {
        super('Unauthorized', StatusCodes.UNAUTHORIZED, 'Unauthorized', details);
    }
}

module.exports = UnauthorizedError;