const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/*-- MAGIC HERE ---*/

const stage = {};

function lookup(timestamp, salt) {
  return timestamp + '__' + salt;
}

function download(req, res) {
  const filePath = __dirname + '/../public/files/' + req.params.filename; // resolve file path
  const id = lookup(req.query.timestamp, req.query.salt); // set id

  stage[id] = 1;

  res.download(filePath, function onComplete() {
    stage[id] = 0;
  });
}

function poll(req, res) {
  const id = lookup(req.query.timestamp, req.query.salt); // set id

  const observe = setInterval(function() {
    if (stage[id] === 0) {
      clearInterval(observe);
      res.sendStatus(200).end();
      delete stage[id]; //clear stage
    }
  }, 100);

  res.setTimeout(5000, function onTimeout() {
    clearInterval(observe);
    res.sendStatus(204).end();
  });
}

router.get('/downloads/:filename', download);
router.get('/poll', poll);

module.exports = router;
