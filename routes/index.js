var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
      title: 'First Express Page',
        message: 'This works pretty well so far'});
});


// make this public so the rest of app can see it
module.exports = router;
