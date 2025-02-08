var express = require('express');
var router = express.Router();

// Greeting API
router.get('/', function (req, res) {
  res.send('Welcome to To-Do Management System API');
});

module.exports = router;
