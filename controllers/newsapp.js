//controllers
const express = require("express");
const router = express();
const Fetcher = require("../models/fetcher.js");
const auth = require("../services/auth.js")
const users = require("../models/newsapp.js");
const userModelObject = require("../models/user.js")

//Newsington Controllers

router.get("/", Fetcher.topNews, (req, res) => {
  // res.json(res.locals.allNewsData.articles);
res.render('index', {data: res.locals.data.articles});
});

router.get("/business", Fetcher.business, (req, res) => {
  // res.json(res.locals.allNewsData.articles);
res.render('index', {data: res.locals.data.articles});
});

router.get("/users/profile", userModelObject.findByEmailMiddleware, (req, res, next) => {
  //res.json(res.locals.userData)
  res.render('profile', {data: res.locals.userData, favorite: res.locals.userData.favorite_source})
})


// //House Controllers

// router.get("/houses", houses.allHouses, (req, res, next) => {
//   res.render('../views/houses/index', { houses: res.locals.housesData});
// });

// router.get("/houses/:id", houses.oneHousewithStudents, (req, res, next) => {
//   res.render('../views/houses/show', {data: res.locals.houseAndStudentData, name: res.locals.houseAndStudentData[0].name, img: res.locals.houseAndStudentData[0].img_url});
// });



module.exports = router;