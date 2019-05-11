const express = require('express');
const router = express.Router();
const knex = require('../database/index');
const verify = require('../middleware/verify');
const passport = require('passport');
const User = require('../database/models/User');
const Gallery = require('../database/models/Gallery');
const Comment = require('../database/models/Comment');
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

// comment test
router.get('/comment', (req, res) => {
  new Comment()
    // .query((qb) => {
    //   qb.orderBy('id', 'DESC');
    // })
    .where({ user_id: 1 })
    .fetchAll()
    .then((results) => {
      let resultsObj = results.toJSON();

      return res.send(resultsObj);
    });
});
//

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

// single photo page

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
          new Comment()
            .where({ gallery_id: req.params.gallery_id })
            .fetchAll({ withRelated: ['users'] })
            .then((comments) => {
              let commentsObj = comments.toJSON();
              const gallery = {
                main: mainGalleryObj,
                stack1: stack1,
                stack2: stack2,
                stack3: stack3,
                comments: commentsObj,
              };
              return res.render('./templates/gallery/singleGal', gallery);
              // return res.send(commentsObj);
            });
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
      if (req.user.role_id === 1 || req.user.id === galleryObj.user_id) {
        new Gallery({
          id: req.params.gallery_id,
        })
          .destroy()
          .then(() => {
            return res.redirect(`/gallery/list`);
          });
      } else {
        return res.send('brah this aint yours');
      }
    });
});

router.get('/:gallery_id/edit', verify, (req, res) => {
  new Gallery()
    .where({ id: req.params.gallery_id })
    .fetch({ withRelated: ['users'] })
    .then((results) => {
      let mainGalleryObj = results.toJSON();
      // console.log(mainGalleryObj);
      // console.log(mainGalleryObj.title);
      if (req.user.role_id === 1) {
        return res.render('./templates/gallery/editGal', mainGalleryObj);
      }
      if (mainGalleryObj.users.id !== req.user.id) {
        return res.render('./templates/error');
      }
      return res.render('./templates/gallery/editGal', mainGalleryObj);
    });
});

// comments below

router.get('/:gallery_id/comment', verify, (req, res) => {
  new Gallery()
    .where({ id: req.params.gallery_id })
    .fetch()
    .then((results) => {
      let mainGalleryObj = results.toJSON();

      return res.render('./templates/gallery/newComment', mainGalleryObj);
    });
});

router.post('/:gallery_id/comment', verify, (req, res) => {
  new Comment({
    body: req.body.body,
    gallery_id: req.params.gallery_id,
    user_id: req.user.id,
  })
    .save()
    .then(() => {
      return res.redirect(`/gallery/${req.params.gallery_id}`);
    });
});

// edit attempt 2
router.post('/:gallery_id', verify, (req, res) => {
  const body = req.body;
  const gallery_id = req.params.gallery_id;
  Gallery.where({ id: gallery_id })
    .fetch()
    .then((gallery) => {
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
