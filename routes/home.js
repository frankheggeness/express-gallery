const express = require('express');
const router = express.Router();
const knex = require('../database/index');
const verify = require('../middleware/verify');
const passport = require('passport');
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');

router.get('/login', (req, res) => {
  res.render('./templates/login');
});

// router.get('/', (req, res) => {

//   res.render('./templates/main');
// });

// router
//   .route('/')
//   .get((req, res) => {
//     User.where({ id: req.user.id })
//       .fetch({ withRelated: ['galleries'] })
//       .then(function(user) {
//         const gallery = {
//           galleries: user.related('galleries').toJSON(),
//         };

//         // return res.render('templates/gallery/gallery', gallery);
//         console.log(gallery)
//         return res.render('./templates/main');
//       });
//   })
//   .post((req, res) => {
//     res.send('create a new gallery photo');
//   });

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

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

module.exports = router;
