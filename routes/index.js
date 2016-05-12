var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// test, faut bien s'amuser
router.get('/bp', function(req, res, next) {
  res.render('index', { title: 'MY page, bitch', image: '00.jpg'});
});

module.exports = router;
