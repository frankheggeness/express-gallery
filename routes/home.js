const express = require('express');
const router = express.Router();
const knex = require('../database/index');
const verify = require('../middleware/verify');
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('./templates/login');
});

router.get('/', (req, res) => {
  res.render('./templates/main');
});

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;
