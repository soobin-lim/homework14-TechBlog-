var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {

  if (req.session.username == undefined) {
    req.session.username = '';
  }

  res.render('login',
    {
      title: 'Express', 
      nevbar_text: 'The Tech Blog ',
      username1: req.session.username2
    });
});

module.exports = router;
