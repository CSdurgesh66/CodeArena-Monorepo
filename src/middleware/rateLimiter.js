const express = require('express');
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // max requests per IP
    message: {
        success: false,
        message: "Too many requests, Please try again later"
    },
    standardHeaders: true,
    legacyHeaders: false
});


const aiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // max requests per IP
    message: {
        success: false,
        message: "Too many requests, Please try again later"
    },
    standardHeaders: true,
    legacyHeaders: false
});


module.exports = {apiLimiter, aiLimiter}

