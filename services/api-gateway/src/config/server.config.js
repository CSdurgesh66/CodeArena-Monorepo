require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,

    SERVICES: {
        AUTH: process.env.AUTH_SERVICE_URL,
        PROBLEM: process.env.PROBLEM_SERVICE_URL,
        SUBMISSION: process.env.SUBMISSION_SERVICE_URL,
        EVALUATOR: process.env.EVALUATOR_SERVICE_URL,
    },

    AI_API_KEY:process.env.AI_API_KEY,


}