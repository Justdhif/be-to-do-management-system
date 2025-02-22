var express = require('express');
var router = express.Router();

// Greeting API
router.get('/', function (req, res) {
  res.send('lorem ipsum consectetur adipiscing, Alhamdulillah API is running');
});

module.exports = router;
