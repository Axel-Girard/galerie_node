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
  var img = fs.readFileSync(process.argv.get(2));
  res.render('bp', {
    title: 'my page',
    argv: process.argv.slice(2),
    image: img
  });
});

router.get('/dw', function (req, res) {
  res.download('app.js');
});

router.get('/img', function (req, res) {
  var img = fs.readFileSync(process.argv.get(2));
  res.writeHead(200, {'Content-Type': 'image/gif' });
  res.end(img, 'binary');
});

module.exports = router;
