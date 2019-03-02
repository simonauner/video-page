import { getContent } from './content';

// Initialize express router
const router = require('express').Router();

// Set default API response
router.get('/', function(req, res) {
    res.json({
        status: 'API is working',
    });
});

router.get('/content/:contentId', (req, res) => {
    getContent(req.params.contentId)
        .then(function(response) {
            res.json(response);
        })
        .catch(err => {
            const statusCode = err.statusCode || 500;
            const message = err.message || 'something went terribly wrong!';
            res.status(statusCode).json({ message });
        });
});
// Export API routes
module.exports = router;
