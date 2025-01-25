var express = require('express');
var router = express.Router();
const { pool } = require('../database/db');

// GET all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;