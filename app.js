var db = require('./models'),
    express = require('express'),
    sequelize=require('sequelize'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    pg = require('pg'),
    ejs = require('ejs'),
    request = require('request'),
    app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static('public'));

app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true
  }))

app.use("/", function (req, res, next) {
  req.login = function (user) {
    req.session.userId = user.id;
  };
  req.currentUser = function () {
    return db.User.
      find({
        where: {
          id: req.session.userId
       }
      }).
      then(function (user) {
        req.user = user;
        return user;
      })
  };
  req.logout = function () {
    req.session.userId = null;
    req.user = null;
  }
  next();
  });
app.get("/signup", function (req, res) {
  res.send("Coming soon");
  });
app.get("/login", function (req, res) {
  res.render("login");
  });
app.get("/profile", function (req, res) {
  req.currentUser()
      .then(function (user) {
        res.render("profile.ejs", {user: user});
      });
      });

// remember to have Method=Post and action=users
//  for the form

app.post("/login", function (req, res) {
  var user = req.body.user;
  db.User
    .authenticate(user.email, user.password)
    .then(function (user) {
          // note here the super step
          req.login(user);
          // We need to create this route
          res.redirect("/profile"); // redirect to user profile
      });
    });

// where the user submits the sign-up form
app.post("/users", function (req, res) {
  // grab the user from the params
  var user = req.body.user;
  // create the new user
  db.User.
    createSecure(user.email, user.password).
    then(function(){
        res.send("SIGNED UP!");
      });
    });

// listen on PORT 3000
app.listen(3000, function () {
  console.log("SERVER RUNNING");
});