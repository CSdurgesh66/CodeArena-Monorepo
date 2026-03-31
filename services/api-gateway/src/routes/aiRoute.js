const express = require('express');
const { analyzeCode } = require('../services/aiService');
const authMiddleware = require('../middleware/authMiddleware');
const { aiLimiter } = require('../middleware/rateLimiter');

const router = express.Router();

router.post('/analyze', authMiddleware,aiLimiter, async (req, res) => {
    try {

        const { code, language, problemTitle } = req.body;

        if (!code || code.trim().length === 0)
            return res.status(400).json({
                success: false,
                message: "'code' is required"
            });

        const analysis = await analyzeCode({ code, language, problemTitle });

        res.status(200).json(analysis);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Internal Server Error during AI analysis"
        });
    }
})

module.exports = router;