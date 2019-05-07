const express = require('express');
const exphbs = require('express-handlebars');
const PORT = 3000;
const verify = require('./middleware/verify');

const User = require('./database/models/User');
const bodyParser = require('body-parser');
const fs = require('fs');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cookieParser = require('cookie-parser');

// routes
const homeRoute = require('./routes/home');
const galleryRoute = require('./routes/gallery');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// passport stuff
app.use(express.static('public'));
app.use(cookieParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

passport.use(
  new LocalStrategy(function(username, password, done) {
    return new User({ username: username })
      .fetch()
      .then((user) => {
        console.log(user);

        if (user === null) {
          return done(null, false, { message: 'bad username and password' });
        } else {
          user = user.toJSON();
          // happy route: username exists, passsword matches
          if (user.password === password) {
            return done(null, user);
          }
          // error route
          else {
            return done(null, false, { message: 'bad username or password' });
          }
        }
      })
      .catch((err) => {
        console.log('error', err);
        return done(err);
      });
  }),
);

passport.serializeUser(function(user, done) {
  console.log('serializing');
  return done(null, { id: user.id, username: user.username });
});

passport.deserializeUser(function(user, done) {
  console.log('deserial');
  console.log(user);

  return new User({ id: user.id }).fetch().then((user) => {
    user = user.toJSON();
    done(null, {
      id: user.id,
      username: user.username,
    });
  });
});

// app.use('/', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

app.get('/login', (req, res) => {
  res.render('./templates/login');
});

app.get('/', (req, res) => {
  res.render('./templates/main');
});

app.use('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

// app.get('/', (req, res) => {
//   res.render('./templates/main');
// });

// app.use('/', homeRoute);
app.use('/gallery', galleryRoute);

const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});
