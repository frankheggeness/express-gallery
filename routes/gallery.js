const express = require('express');
const router = express.Router();
const knex = require('../database/index');
const verify = require('../middleware/verify');
const passport = require('passport');
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');

router.get('/:gallery_id', (req, res) => {
  // new Gallery().fetchAll().then((results) => {
  //   console.log(results.toJSON());
  //   let lastResult = results.pop().toJSON();
  //   let stack1 = results.pop().toJSON();
  //   let stack2 = results.pop().toJSON();
  //   let stack3 = results.pop().toJSON();
  //   const gallery = {
  //     big: lastResult,
  //     stack1: stack1,
  //     stack2: stack2,
  //     stack3: stack3,
  //   };
  new Gallery()
    .where({ id: req.params.gallery_id })
    .fetch()
    .then((results) => {
      let mainGalleryObj = results.toJSON();
      // console.log(results.toJSON());
      // return res.render('./templates/main');
      new Gallery()
        .query(function(qb) {
          qb.where('id', '!=', req.params.gallery_id);
        })
        .fetchAll()
        .then((results) => {
          let stack1 = results.pop().toJSON();
          let stack2 = results.pop().toJSON();
          let stack3 = results.pop().toJSON();
          const gallery = {
            main: mainGalleryObj,
            stack1: stack1,
            stack2: stack2,
            stack3: stack3,
          };
          return res.render('./templates/singleGal', gallery);
        });
    });
});

module.exports = router;

// .query((qb) =>{
//   qb.orderBy('id', 'DESC')
// })

// Profile.collection().query(function(qb) {
//   qb.where('user_id', '=', 123)
//  }).fetch()
//   .then(function(collection) {...
