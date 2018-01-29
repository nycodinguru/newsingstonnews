//controllers
const express = require("express");
const router = express();
const Fetcher = require("../models/fetcher.js");
const authObject = require("../services/auth.js")

//Newsington Controllers

router.get("/", Fetcher.topNews, (req, res) => {
  // res.json(res.locals.allNewsData.articles);
res.render('index', {data: res.locals.data.articles});
});

router.get("/ap", Fetcher.ap, (req, res, next) => {
  res.render('source', {data: res.locals.data});
});

router.get("/signup", (req, res) => {
   res.render('signup');
});

router.get("/login", (req, res) => {
   res.render('login');
});


// //House Controllers

// router.get("/houses", houses.allHouses, (req, res, next) => {
//   res.render('../views/houses/index', { houses: res.locals.housesData});
// });

// router.get("/houses/:id", houses.oneHousewithStudents, (req, res, next) => {
//   res.render('../views/houses/show', {data: res.locals.houseAndStudentData, name: res.locals.houseAndStudentData[0].name, img: res.locals.houseAndStudentData[0].img_url});
// });



module.exports = router;