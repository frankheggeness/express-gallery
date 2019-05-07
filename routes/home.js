const express = require('express');
const router = express.Router();
const knex = require('../database/index');

router.get('/login', (req, res) => {
  res.render('./templates/login');
});

module.exports = router;
