var express = require('express');
var router = express.Router();
const getStats = require('../modules/get_trend_stats');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/get_trends?*', async function(req, res) {
    const stats = await getStats(req.query);
    let html = '';

    Object.keys(stats).map(k => {
        html += `${k} - ${stats[k]}<br />`;
    });

    res.send(html);
});

module.exports = router;
