const express = require('express');
const router = express.Router();
const knex = require('../database/index');
const verify = require('../middleware/verify');
const passport = require('passport');
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');

router.get('/new', verify, (req, res) => {
  return res.render('./templates/gallery/newGal');
});

router.post('/new', verify, (req, res) => {
  new Gallery({
    title: req.body.title,
    description: req.body.description,
    photo_url: req.body.photo_url,
    user_id: req.user.id,
  })
    .save()
    .then(() => {
      return res.redirect(`/gallery`);
    });
});

router.get('/:gallery_id', (req, res) => {
  new Gallery()
    .where({ id: req.params.gallery_id })
    .fetch({ withRelated: ['users'] })
    .then((results) => {
      let mainGalleryObj = results.toJSON();
      console.log(results.toJSON());
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
          return res.render('./templates/gallery/singleGal', gallery);
        });
    });
});

router.delete('/:gallery_id', verify, (req, res) => {
  new Gallery({
    id: req.params.gallery_id,
  })
    .destroy()
    .then(() => {
      return res.redirect(`/gallery`);
    });
});

module.exports = router;

// .query((qb) =>{
//   qb.orderBy('id', 'DESC')
// })

// Profile.collection().query(function(qb) {
//   qb.where('user_id', '=', 123)
//  }).fetch()
//   .then(function(collection) {..
