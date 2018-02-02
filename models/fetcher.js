const axios = require('axios');
const Fetcher = {};


// fetch the top trending news articles from the NewsAPI API:  https://newsapi.org
Fetcher.topNews = (req, res, next) => {
  axios({
    method: "get",
    url: "https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=a15bce4b34d143389058f96a45bb62b1"
  })
  .then(response => {
   res.locals.data = response.data;
  next();
  })
  .catch(err => {
        console.log(
          "Error encountered in axios call in fetcher.topNews, error:",
          err
        );
      });
}

Fetcher.business = (req, res, next) => {
  axios({
    method: "get",
    url: "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a15bce4b34d143389058f96a45bb62b1"
  })
  .then(response => {
   res.locals.data = response.data;
  next();
  })
  .catch(err => {
        console.log(
          "Error encountered in axios call in fetcher.topNews, error:",
          err
        );
      });
}

Fetcher.world = (req, res, next) => {
  axios({
    method: "get",
    url: "https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=a15bce4b34d143389058f96a45bb62b1"
  })
  .then(response => {
   res.locals.data = response.data;
  next();
  })
  .catch(err => {
        console.log(
          "Error encountered in axios call in fetcher.topNews, error:",
          err
        );
      });
}

Fetcher.tech = (req, res, next) => {
  axios({
    method: "get",
    url: "https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=a15bce4b34d143389058f96a45bb62b1"
  })
  .then(response => {
   res.locals.data = response.data;
  next();
  })
  .catch(err => {
        console.log(
          "Error encountered in axios call in fetcher.topNews, error:",
          err
        );
      });
}

Fetcher.favoriteSource = (req, res, next) => {
  axios({
    method: "get",
    url: ("https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=a15bce4b34d143389058f96a45bb62b1")
  })
  .then(response => {
   res.favoriteSource.data = response.data.articles
    next();
  })
  .catch(err => {
        console.log(
          "Error encountered in axios call in fetcher, error:",
          err
        );
      });
  
}

Fetcher.fakeNews = (req, res, next) => {
  axios({
    method: "get",
    url: ("https://newsapi.org/v2/top-headlines?sources=fox-news&apiKey=a15bce4b34d143389058f96a45bb62b1")
  })
  .then(response => {
   res.locals.data = response.data
    next();
  })
  .catch(err => {
        console.log(
          "Error encountered in axios call in fetcher, error:",
          err
        );
      });
  
}




module.exports = Fetcher;
