const express = require('express');
const exphbs = require('express-handlebars');
const PORT = 3000;
// const articles = require('./routes/articles.js');
// const products = require('./routes/products.js');
const bodyParser = require('body-parser');
const fs = require('fs');
// const methodOverride = require('method-override');
const app = express();
// const knex = require('./database');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

const User = require('./database/models/User');

app.get('/', (req, res) => {
  res.render('./templates/main');
});

const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});

// // new User({
// //   username: 'hi',
// //   password: 'hey',
// // })
// //   .save()
// //   .then(() => {
// new User().fetchAll({ withRelated: ['cars'] }).then((results) => {
//   // results -> bookshelf array Object
//   // users.models -> array of bookshelf User Objects
//   const users = results.models;
//   const userObject = users[0];
//   console.log(userObject);
//   const user = userObject.toJSON();
//   const username = userObject.get('username');
//   console.log(user);
// });
// //   });
// // });

// // knex
// //   .select()
// //   .from('users')
// //   .then((result) => {
// //     console.log(result);
// //   });
