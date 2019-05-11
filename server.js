const express = require('express');
const exphbs = require('express-handlebars');
const verify = require('./middleware/verify');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const fs = require('fs');
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
// const flash = require('connect-flash');

const LocalStrategy = require('passport-local');
const cookieParser = require('cookie-parser');
const redis = require('connect-redis')(session);

const User = require('./database/models/User');

const PORT = 3000;
const saltRounds = 12;

// routes
const homeRoute = require('./routes/home');
const galleryRoute = require('./routes/gallery');

require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// passport stuff
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(
  session({
    store: new redis({ url: process.env.REDIS_URL }),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  }),
);
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
          bcrypt.compare(password, user.password).then((res) => {
            // happy route: username exists, passsword matches
            if (res) {
              return done(null, user);
            }
            // error route
            else {
              return done(null, false, { message: 'bad username or password' });
            }
          });
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
      role_id: user.role_id,
    });
  });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/register', (req, res) => {
  res.render('./templates/register');
});

app.post('/register', (req, res) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    if (err) {
      return res.send(500, 'ERROR');
    }
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      if (err) {
        return res.send(500, 'ERROR');
      }
      return new User({
        username: req.body.username,
        password: hash,
        role_id: 2,
      })
        .save()
        .then((user) => {
          console.log(user);
          return res.redirect('/login');
        })
        .catch((err) => {
          console.log(err);
          return res.send('error making account');
        });
    });
  });
});

app.use('/', homeRoute);
app.use('/gallery', galleryRoute);

const server = app.listen(PORT, () => {
  console.log(`Express app is running at port ${PORT}`);
});
