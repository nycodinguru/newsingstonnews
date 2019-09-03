//controllers
const express = require("express");
const router = express();
const Fetcher = require("../models/fetcher.js");
const auth = require("../services/auth.js");
const users = require("../models/newsapp.js");
const userModelObject = require("../models/user.js");

//Newsington Controllers

router.get("/", Fetcher.topNews, auth.restrict, (req, res) => {
  let userObj = req.session.passport ? req.session.passport : null;
  if(userObj !== null && userObj.user) res.render('index', { data: res.locals.data.articles, category: 'the top headlines' });
  else res.render('index2', {data: res.locals.data.articles, category: 'the top headlines'});
});

router.get("/business", Fetcher.business, auth.restrict, (req, res, next) => { 
  let userObj = req.session.passport ? req.session.passport : null;
  if(userObj !== null && userObj.user) res.render('index', { data: res.locals.data.articles, category: 'business' });
  else res.render('index2', { data: res.locals.data.articles, category: 'business' });
});

router.get("/us", Fetcher.us, auth.restrict, (req, res) => { 
  let userObj = req.session.passport ? req.session.passport : null;
  if(userObj !== null && userObj.user) res.render('index', { data: res.locals.data.articles, category: 'the United States' });
  else res.render('index2', { data: res.locals.data.articles, category: 'the United States' });
});

router.get("/sports", Fetcher.sports, auth.restrict, (req, res) => { 
  let userObj = req.session.passport ? req.session.passport : null;
  if(userObj !== null && userObj.user) res.render('index', { data: res.locals.data.articles, category: 'sports' });
  else res.render('index2', { data: res.locals.data.articles, category: 'sports' });
});

router.get("/tech", Fetcher.tech, auth.restrict, (req, res) => { 
  let userObj = req.session.passport ? req.session.passport : null;
  if(userObj !== null && userObj.user) res.render('index', { data: res.locals.data.articles, category: 'tech' });
  else res.render('index2', { data: res.locals.data.articles, category: 'tech' });
});

router.get("/users/profile", userModelObject.findByEmailMiddleware, (req, res, next) => { 
  res.render("profile", { data: res.locals.userData, favorite: res.locals.userData.favorite_source,
  fname: res.locals.userData.fname }); 
});

router.get(
  "/users/profile/delete", userModelObject.findByEmailMiddleware,
  (req, res, next) => {
    res.render("delete", {
      id: res.locals.userData.id,
      fname: res.locals.userData.fname,
      lname: res.locals.userData.lname
    });
  }
);

module.exports = router;
