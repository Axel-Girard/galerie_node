var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
var url = require('url');
var colors = require('colors/safe');
var mime = require('mime');
var router = express.Router();

/* GET home page. */
router.get('/arg', function(req, res, next) {
  var max = process.argv.slice(2).length;
  console.log(colors.random('total argu : ' + max));
  res.render('index', {
    title: 'Express',
    argc: max, argv: process.argv
  });
});

// test, faut bien commencer quelque part
router.get('/bp', function(req, res, next) {
  res.render('bp', {
    title: 'my page',
    argv: process.argv.slice(2)
  });
});

// test, download of the fille app.js, porque ? porque not !
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

// lire les images des path passés dans les arguments
router.get('/', function(req, res, next) {
  // get all arguments give in commande line
  var elem = process.argv.slice(2);
  if(elem.length >= 1){
    var images = [];
    elem.forEach(function (name) {
      images = images.concat(getImages(name));
      // remove undefined element
      images = images.filter(function(n){ return n != undefined });
    });
    res.render('image', {
      title: 'Images',
      img: images
    });
  } else {
    res.render('no_args', {
      title: 'No arguments'
    });
  }
});

// return all file path from a path, recursivly
function getImages(path){
  // si le path pointe vers un dossier
  if (fs.lstatSync(path).isDirectory()) {
    var ret = [];
    var innerFile = [];
    fs.readdirSync(path).forEach(function (name) {
      // for each elem in the directory, we try to get Images
      innerFile = innerFile.concat(getImages(path+'/'+name));
    });
    ret = ret.concat(innerFile);
    return ret;
  }
  // si le path pointe vers un fichier
  else {
    // if type mime is an image
    result = mime.lookup(path);
    // console.log(colors.america(result));
    if (result.indexOf('image') > -1 ) {
      return path;
    }
  }
}

module.exports = router;
