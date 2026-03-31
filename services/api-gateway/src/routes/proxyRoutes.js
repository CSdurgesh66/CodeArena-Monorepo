const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const logger = require('../config/logger');
const { SERVICES } = require('../config/server.config');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();

function makeProxy(target, pathRewrite = {}) {
    return createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite,
        on: {
            proxyReq: (proxyReq, req) => {
                console.log("Original URL ", req.originalUrl);
                console.log("Forwarded to ", target, proxyReq.path);
                if (req.user) {
                    proxyReq.setHeader('X-User-Id', req.user.id || '');
                    proxyReq.setHeader('X-User-Email', req.user.email || '');
                    proxyReq.setHeader('X-User-Role', req.user.role || '');
                }
                if (req.body) {
                    const bodyData = JSON.stringify(req.body);
                    proxyReq.setHeader('Content-Type', 'application/json');
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                    proxyReq.write(bodyData);
                }
            },
            error: (err, req, res) => {
                logger.error(`Proxy error - ${target} | ${err.message}`);
                res.status(502).json({
                    success: false,
                    message: 'Downstream service unavailable'
                });
            }
        }
    });
}


router.use('/auth',
    makeProxy(SERVICES.AUTH, {
        '^/': '/api/v1/auth/'
    })
);

router.use('/problems',
    authMiddleware,
    makeProxy(SERVICES.PROBLEM, {
        '^/': '/api/v1/problems/'
    })
);

router.use('/submissions',
    authMiddleware,
    makeProxy(SERVICES.SUBMISSION, {
        '^/': '/api/v1/submissions/'
    })
);


module.exports = router;