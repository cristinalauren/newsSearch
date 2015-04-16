# newsSearch

app.post("/user", function (req, res) {
  // grab the user from the params
  var User = req.body.user;
  // create the new user
  db.User.
    createSecure(user.email, user.password).
    then(function(){
        res.send("SIGNED UP!");
      });
});















/*
app.use("/", function(req, res, next) {
    req.login = function(user) {
        req.session.userId = user.id;
    };
    req.currentUser = function() {
        return db.User.find(req.session.userId)
            .then(function(dbUser) {
                req.user = dbUser;
                return dbUser;
            });
    };
    req.logout = function() {
        req.session.userId = null;
        req.user = null;
    };
    next();});


app.get('/', function(req,res){
  res.render('register');
  });

app.post("/register", function (req, res) {
    var email = req.body.email;
    var password = req.body.password;
    db.User.createSecure(email,password)
    .then(function(user){
      res.redirect('/login')
    });


app.get("/articles", function(req,res){
  res.render("/login");
  });

app.post("/login", function (req, res) {
  req.User().then(function (user) {
    res.render('/articles', {user: user});
      });
      });

app.post("/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  db.User.authenticate(email, password)
    .then(function (user) {
          req.login(user);
          res.redirect("/articles"); // redirect to user profile
      });
});
app.get("/login", function (req, res) {
  req.currentUser().then(function (user) {
    res.render('/articles', {user: user});
      });
      });
});
});
app.use("articles", function(req,res,next) {
  req.login = function(user) {
    req.session.userId = user.id;
  };
  req.currentUser = function() {
    return db.User.find(req.session.userId)
             .then(function(dbUser) {
              req.user = dbUser;
              return dbUser;
             });
  };
  req.logout = function() {
    req.session.userId = null;
    req.user = null;
*/






# newsSearch
app.get("/login", function (req, res) {
  req.currentUser().then(function (user) {
    res.render('articles', {user: user});
      });
      });


app.post("/users", function (req, res) {
  // grab the user from the params
  var user = req.body.user;
  // create the new user
  db.User.createSecure(User.email, User.password).then(function(){
   res.send("SIGNED UP!");
    });
//where the user submits the sign-up form
    //app.post("/user", function (req, res) {
  // grab the user from the params
  var user = req.body.user;
  // create the new user
  db.User.createSecure(User.email, User.password).then(function(){
   res.send("SIGNED UP!");
    });
 //   });//

app.use("articles", function(req,res,next) {
  req.login = function(user) {
    req.session.userId = user.id;
  };
  req.currentUser = function() {
    return db.User.find(req.session.userId)
             .then(function(dbUser) {
              req.user = dbUser;
              return dbUser;
             });
  };
  req.logout = function() {
    req.session.userId = null;
    req.user = null;
  };
  next();
});
