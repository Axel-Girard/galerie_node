var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');
var colors = require('colors/safe');
var mmm = require('mmmagic'),
    Magic = mmm.Magic;
var magic = new Magic(mmm.MAGIC_MIME_TYPE);
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var max = process.argv.slice(2).length;
  console.log(colors.random('total argu : ' + max));
  res.render('index', {
    title: 'Express',
    argc: max, argv: process.argv
  });
});

// test, faut bien s'amuser
router.get('/bp', function(req, res, next) {
  res.render('bp', {
    title: 'my page',
    argv: process.argv.slice(2)
  });
});

// download of the fille app.js, porque ? porque not !
router.get('/dw', function (req, res) {
  res.download('app.js');
});

// lire une image n'importe où sur le serveur
router.get('/img/*', function(req, res, next) {
  var request = url.parse(req.url, true);
  var path = request.pathname.substring(5);
  path = decodeURIComponent(path);

  var file = fs.readFileSync(path);
  res.writeHead(200, {'Content-Type': 'image/gif' });
  res.end(file, 'binary');
});

// lire les images des path passé dans les arguments
router.get('/image', function(req, res, next) {
  var elem = process.argv.slice(2);
  var images = [];
  elem.forEach(function (name) {
    images = images.concat(getImages(name));
    console.log(getImages(name).ret);
  });
  res.render('image', {
    img: images
  });
});

// return all file path from a path, recursivly
function getImages(path){
  var ret = [];

  if (fs.lstatSync(path).isDirectory()) {
    var innerFile = [];
    fs.readdirSync(path).forEach(function (name) {
      innerFile = innerFile.concat(getImages(path+'/'+name));
    });
    ret = ret.concat(innerFile);
    return ret;
  } else {
    var ret;

    magic.detectFile(path, function(err, result) {
      if (err) throw err;

      console.log(colors.cyan(result));
      if (result === 'image/png') {
        console.log(colors.america(path));
      } else {
        path = '';
      }
      ret = path;
    });
    return magic.detectFile.result;
  }
}

module.exports = router;
