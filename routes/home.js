const express = require('express');
const router = express.Router();
const knex = require('../database/index');
const verify = require('../middleware/verify');
const passport = require('passport');
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');
const profileVerify = require('../middleware/profileVerify');

router.get('/login', profileVerify, (req, res) => {
  res.render('./templates/login');
});

router.get('/:user_id', verify, (req, res) => {
  new User()
    .where({ id: req.params.user_id })
    .fetch()
    .then((user) => {
      let userObj = user.toJSON();
      console.log('@@@@@@@@@@@@@@' + userObj);
      res.render('./templates/user', userObj);
    });
});

router.get('/', (req, res) => {
  new Gallery().fetchAll().then((results) => {
    console.log(results.toJSON());
    let lastResult = results.pop().toJSON();
    let stack1 = results.pop().toJSON();
    let stack2 = results.pop().toJSON();
    let stack3 = results.pop().toJSON();
    const gallery = {
      big: lastResult,
      stack1: stack1,
      stack2: stack2,
      stack3: stack3,
    };
    return res.render('./templates/main', gallery);
  });
});

router.get('/:user_id', verify, (req, res) => {
  new Gallery().fetchAll().then((results) => {
    console.log(results.toJSON());
    let lastResult = results.pop().toJSON();
    let stack1 = results.pop().toJSON();
    let stack2 = results.pop().toJSON();
    let stack3 = results.pop().toJSON();
    const gallery = {
      big: lastResult,
      stack1: stack1,
      stack2: stack2,
      stack3: stack3,
    };
    return res.render('./templates/main', gallery);
  });
});

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;
