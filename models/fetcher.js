const axios = require('axios');
const Fetcher = {};


// fetch the top trending news articles from the NewsAPI API:  https://newsapi.org
Fetcher.topNews = (req, res, next) => {
  axios({
    method: "get",
    url: `https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=${process.env.API_KEY}`
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
    url: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.API_KEY}`
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
    url: `https://newsapi.org/v2/top-headlines?sources=cnn&apiKey=${process.env.API_KEY}`
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
    url: `https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=${process.env.API_KEY}`
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
    url: (`https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=${process.env.API_KEY}`)
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


module.exports = Fetcher;
