var express = require('express');
var router = express.Router();
const { promisify } = require('util');
const getStats = require('../modules/get_trend_stats');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/get_trends?*', async function(req, res) {
    const stats = await getStats(req.query);


    res.send(stats);
});

module.exports = router;
