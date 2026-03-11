const express = require('express');
const axios = require('axios');
const { SERVICES } = require('../config/server.config');

const router = express.Router();

async function ping(url) {
    try {
        console.log(url);
        await axios.get(url, { timeout: 3000 });

        return 'healthy';
    } catch {
        return 'unreachable';
    }
}

router.get('/health', async (req, res) => {
    const [auth, problem, submission] = await Promise.all([
        ping(`${SERVICES.AUTH}/ping`),
        ping(`${SERVICES.PROBLEM}/ping`),
        ping(`${SERVICES.SUBMISSION}/ping`),

    ]);

    const services = { auth, problem, submission };
    const allHealthy = Object.values(services).every(s => s === 'healthy');
    return res.status(allHealthy ? 200 : 207).json({
        success: true,
        gateway: 'healthy',
        services,
        timestamp: new Date().toISOString(),
    });

})

module.exports = router;