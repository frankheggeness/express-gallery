const express = require('express');
const router = express.Router();
const knex = require('../database/index');
const verify = require('../middleware/verify');
const passport = require('passport');
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');
const editVerify = require('../middleware/editVerify');

router.get('/list', (req, res) => {
  new Gallery()
    .query((qb) => {
      qb.orderBy('id', 'DESC');
    })
    .fetchAll()
    .then((results) => {
      let resultsObj = results.toJSON();
      let newestPost = resultsObj.splice(0, 1);
      let galleryObj = resultsObj;
      let outputObj = {
        new: newestPost[0],
        list: galleryObj,
      };

      return res.render('./templates/gallery/listGal', outputObj);
    });
});

router.get('/new', verify, (req, res) => {
  return res.render('./templates/gallery/newGal');
});

router.post('/new', verify, (req, res) => {
  new Gallery({
    title: req.body.title,
    description: req.body.description,
    photo_url: req.body.photo_url,
    user_id: req.user.id,
    author: req.body.author,
  })
    .save()
    .then(() => {
      return res.redirect(`/gallery/list`);
    });
});

router.get('/:gallery_id', (req, res) => {
  new Gallery()
    .where({ id: req.params.gallery_id })
    .fetch({ withRelated: ['users'] })
    .then((results) => {
      let mainGalleryObj = results.toJSON();
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

// fix delete below

router.delete('/:gallery_id', verify, (req, res) => {
  new Gallery({
    id: req.params.gallery_id,
  })
    .fetch()
    .then((gallery) => {
      let galleryObj = gallery.toJSON();
      console.log('#$@%#^$#$');
      console.log(galleryObj);
      if (req.user.id !== galleryObj.user_id) {
        return res.send('brah this aint yours');
      }
    });

  new Gallery({
    id: req.params.gallery_id,
  })
    .destroy()
    .then(() => {
      return res.redirect(`/gallery`);
    });
});

router.get('/:gallery_id/edit', verify, (req, res) => {
  new Gallery()
    .where({ id: req.params.gallery_id })
    .fetch({ withRelated: ['users'] })
    .then((results) => {
      let mainGalleryObj = results.toJSON();
      if (req.user.role_id === 1) {
        return res.render('./templates/gallery/editGal', mainGalleryObj);
      }
      if (mainGalleryObj.users.id !== req.user.id) {
        return res.send('you arent allowed to do that!');
      }
      return res.render('./templates/gallery/editGal', mainGalleryObj);
    });
});

// edit attempt 2
router.post('/:gallery_id', verify, (req, res) => {
  const body = req.body;
  const gallery_id = req.params.gallery_id;
  Gallery.where({ id: gallery_id })
    .fetch()
    .then((gallery) => {
      // if (gallery.attributes.user_id !== req.user.id && req.user.role_id !== 1) {
      //   req.flash('error', 'You may not edit photos that are not yours');
      //   return res.redirect(`/gallery/${gallery_id}`);
      // }
      new Gallery({ id: gallery_id })
        .save(
          {
            user_id: req.user_id,
            title: body.title,
            photo_url: body.photo_url,
            description: body.description,
            author: body.author,
          },
          { patch: true },
        )
        .then(() => {
          console.log('edit done');
          return res.redirect(`/gallery/list`);
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
//   .then(function(collection) {..
