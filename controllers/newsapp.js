//controllers
const express = require("express");
const router = express();
const Fetcher = require("../models/fetcher.js");
const auth = require("../services/auth.js");
const users = require("../models/newsapp.js");
const userModelObject = require("../models/user.js");
var weather = require("weather-js");

let location = "new york, NY"

//Newsington Controllers

router.get("/", Fetcher.topNews, (req, res) => {
  weather.find(
    { search: location, degreeType: "F" },

    function(err, result) {
      if (err) console.log(err);

      // console.log(JSON.stringify(result, null, 2));
      
      //console.log(result[0].current)
      //return city = result[0].current.observationpoint
      res.render('index2', {data: res.locals.data.articles, category: 'the top headlines',location: result[0].location.name, temp: result[0].current.temperature, imgurl: result[0].current.imageUrl});
    }
  );

});

router.get("/topnews", Fetcher.topNews, auth.restrict, (req, res) => {  weather.find(
    { search: location, degreeType: "F" },

    function(err, result) {
      if (err) console.log(err);

      res.render('index', {data: res.locals.data.articles, category: 'the top headlines',location: result[0].location.name, temp: result[0].current.temperature, imgurl: result[0].current.imageUrl});
    }
  );
  
});

router.get("/business", Fetcher.business, auth.restrict, (req, res) => { weather.find(
    { search: location, degreeType: "F" },

    function(err, result) {
      if (err) console.log(err);

      res.render('index', {data: res.locals.data.articles, category: 'business',location: result[0].location.name, temp: result[0].current.temperature, imgurl: result[0].current.imageUrl});
    }
  );
});

router.get("/us", Fetcher.world, auth.restrict, (req, res) => { weather.find(
    { search: location, degreeType: "F" },

    function(err, result) {
      if (err) console.log(err);

      res.render('index', {data: res.locals.data.articles, category: 'the US', location: result[0].location.name, temp: result[0].current.temperature, imgurl: result[0].current.imageUrl});
    }
  );
});

router.get("/tech", Fetcher.tech, auth.restrict, (req, res) => {
   weather.find(
    { search: location, degreeType: "F" },

    function(err, result) {
      if (err) console.log(err);

      res.render('index', {data: res.locals.data.articles, location: result[0].location.name, category: 'tech', temp: result[0].current.temperature, imgurl: result[0].current.imageUrl});
    }
  );
});

router.get(
  "/users/profile",
  userModelObject.findByEmailMiddleware,
  (req, res, next) => { 

    location = res.locals.userData.location

    weather.find(
    { search: location, degreeType: "F" },

    function(err, result) {
      if (err) console.log(err);

    
      res.render("profile", {data: res.locals.userData, favorite: res.locals.userData.favorite_source,
      fname: res.locals.userData.fname,
      lname: res.locals.userData.lname, location: result[0].location.name, temp: result[0].current.temperature, imgurl: result[0].current.imageUrl});
    }
  );
  
      
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
