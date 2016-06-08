var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');
var colors = require('colors/safe');
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
  });
  res.render('image', {
    img: images
  });
});

// return all file path from a path, recursivly
function getImages(path){
  var ret = [];

  if (fs.lstatSync(path).isDirectory()) {
    console.log(colors.white(colors.trap('Here we go!')));
    var innerFile = [];
    fs.readdirSync(path).forEach(function (name) {
      console.log(colors.gray(path+'/'+name));
      innerFile = innerFile.concat(getImages(path+'/'+name));
    });
    ret = ret.concat(innerFile);
    return ret;
  } else {
    return path;
  }
}

module.exports = router;
