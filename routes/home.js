const express = require('express');
const router = express.Router();
const knex = require('../database/index');
const verify = require('../middleware/verify');
const passport = require('passport');
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');
const profileVerify = require('../middleware/profileVerify');
const Message = require('../database/models/Message');
const mailVerify = require('../middleware/mailVerify');

router.get('/login', profileVerify, (req, res) => {
  res.render('./templates/login');
});

router.get('/inbox', mailVerify, (req, res) => {
  res.render('./templates/login');
});

// sent mail route

router.get('/inbox/sent', verify, (req, res) => {
  res.redirect(`/${req.user.id}/inbox/sent`);
});

router.get('/:user_id/inbox/sent', verify, (req, res) => {
  if (req.params.user_id == req.user.id || req.user.role_id == 1) {
    // happy route
    new Message()
      .where({ sender_user_id: req.params.user_id })
      .fetchAll({ withRelated: ['users'] })
      .then((results) => {
        let messageObj = results.toJSON();
        let inboxObj = {
          mail: results.toJSON(),
        };
        // res.send(messageObj);
        return res.render('./templates/mail/sentMail', inboxObj);
      });
  } else {
    return res.render('./templates/error', { messages: `This isn't your inbox!` });
  }
});

router.delete('/inbox/:message_id', verify, (req, res) => {
  new Message({
    id: req.params.message_id,
  })
    .fetch()
    .then((message) => {
      let messageObj = message.toJSON();
      if (req.user.role_id === 1 || req.user.id == messageObj.receiver_user_id) {
        new Message({
          id: req.params.message_id,
        })
          .destroy()
          .then(() => {
            return res.redirect(`/${req.user.id}/inbox`);
          });
      } else {
        return res.render('./templates/error', { messages: `This isn't your inbox!` });
      }
    });
});
// draft attempt

router.get('/draft', verify, (req, res) => {
  return res.render('./templates/mail/draft');
});

router.get('/contact', verify, (req, res) => {
  return res.render('./templates/contact');
});

// send message

router.post('/draft', verify, (req, res) => {
  new Message({
    title: req.body.title,
    body: req.body.body,
    sender_user_id: req.user.id,
    receiver_user_id: req.body.receiver_user_id,
  })
    .save()
    .then(() => {
      return res.redirect(`/${req.user.id}/inbox`);
    });
});

// user page

router.get('/:user_id', verify, (req, res) => {
  new User()
    .where({ id: req.params.user_id })
    .fetch()
    .then((user) => {
      let userObj = user.toJSON();
      new Gallery()
        .where({ user_id: req.params.user_id })
        .fetchAll()
        .then((galleries) => {
          let userPageObj = {
            user: userObj,
            pictures: galleries.toJSON(),
          };

          res.render('./templates/user', userPageObj);
        });
    });
});

router.get('/', (req, res) => {
  new Gallery().fetchAll().then((results) => {
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

// inbox attempt
router.get('/:user_id/inbox', verify, (req, res) => {
  if (req.params.user_id == req.user.id || req.user.role_id == 1) {
    // happy route
    new Message()
      .where({ receiver_user_id: req.params.user_id })
      .query((qb) => {
        qb.orderBy('id', 'DESC');
      })
      .fetchAll({ withRelated: ['users'] })
      .then((results) => {
        let messageObj = results.toJSON();
        let inboxObj = {
          mail: results.toJSON(),
        };
        // res.send(messageObj);
        return res.render('./templates/mail/inbox', inboxObj);
      });
  } else {
    return res.render('./templates/error', { messages: `This isn't your inbox!` });
  }
});

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;
