var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function(req, res, next) {
  var max = process.argv.slice(2).length;
  console.log('total argu : ' + max);
  res.render('index', { title: 'Express', argc: max, argv: process.argv });
});

// test, faut bien s'amuser
router.get('/bp', function(req, res, next) {
  res.render('bp', { title: 'my page', argv: process.argv});
});

// test, un brin plus poussé; ça reste très simple faut pas déconner
router.get('/bp', function(req, res, next) {
  res.render('bp', { title: 'my page', argv: process.argv});
});

router.get('/dw', function (req, res) {
  res.download('app.js');
});

module.exports = router;
