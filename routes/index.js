var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var max = process.argv.slice(2).length;
  console.log('total argu : ' + max);
  res.render('index', { title: 'Express', argc: max, argv: process.argv });
});

// test, faut bien s'amuser
router.get('/bp', function(req, res, next) {
  res.render('bp', {
    title: 'my page',
    argv: process.argv.slice(2)
  });
});

router.get('/dw', function (req, res) {
  res.download('app.js');
});

// lire le contenu d'un répertoire
router.get('/explorer', function(req, res, next) {
  var p = "../"
  fs.readdir(p, function (err, files) {
      if (err) {
          throw err;
      }

      files.map(function (file) {
          return path.join(p, file);
      }).filter(function (file) {
          return fs.statSync(file).isFile();
      }).forEach(function (file) {
          console.log("%s (%s)", file, path.extname(file));
      });
  });
});

// lire le contenu d'un répertoire
router.get('/image', function(req, res, next) {
   var img = fs.readFileSync(process.argv[2]);
   res.writeHead(200, {'Content-Type': 'image/gif' });
   res.end(img, 'binary');
});

module.exports = router;
