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
  save: {
    uninitialize: true
  }}));

app.use("/", function(req, res, next) {
    req.login = function(user) {
        req.session.userId = user.id;
    };
    req.currentUser = function() {
        return db.User.find(req.session.userId)
            .then(function(dbuser) {
                req.user = dbuser;
                return dbuser;
            });
    };
    req.logout = function() {
        req.session.userId = null;
        req.user = null;
    };
    next();
});

app.get("/", function(req, res){
  res.render('index');
});

// app.get('/articles', function(req, res) {
//     res.render('articles');
// });

app.get('/register', function(req, res) {
    res.render("register");
});

app.get('/articles', function(req, res){
  var q = req.query.search;

  if (q) {
    var nytimesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + q + "&api-key=367dc8071434763a60f4fedafb8ee3a9:6:71461120";

    request(nytimesUrl, function(err, response, body){
      if(!err && response.statusCode === 200) {
        var articles = JSON.parse(body).response.docs;
        var articleList = [];
        articles.forEach(function(article){
                var articleTemp = {};
                articleTemp.title = article.headline.main;
                articleTemp.url = article.web_url;
                articleTemp.date = article.pub_date;
                articleTemp.summary = article.snippet;
                articleTemp.source = article.source;

                console.log("make nytimes article for " + q);
                articleList.push(articleTemp);
              });
        // console.log(articles);
        res.render('articles', { articles: articleList });
      } else {
        console.log("ERROR WILL ROBINSON!!");
      }
    });
  } else {
    res.render('articles', { articles: [] });
  }
});

app.post('/register', function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  db.User.createSecure(email,password)
    .then(function(user){
      res.redirect('login');
    });});

app.get('/login', function(req, res) {
    res.render("login");
});

app.get('/login', function(req,res){
        req.currentUser().then(function(user){
        if (user) {
        res.redirect('/articles');
        } else {
        res.render("/register");
        }
       });
       });

app.post('/login', function(req,res){
  var email = req.body.email;
  var password = req.body.password;
  db.User.authenticate(email,password)
    .then(function(dbuser){
      if(dbuser) {
        req.login(dbuser);
        res.redirect('articles');
        };
        })})

app.post("/login", function (req, res) {
  var user = req.body.user;
  db.User.authenticate(email, password)
    .then(function (user) {
          res.send(user);
    });
});

app.get('/favorites',function (req,res){
  res.render ("favorites")
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("login");
});

app.listen(3000,function(){
    console.log("SERVER RUNNING");
    });