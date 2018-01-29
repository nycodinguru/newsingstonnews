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

Fetcher.ap = (req, res, next) => {
  axios({
    method: "get",
    url: ("https://newsapi.org/v2/top-headlines?sources=google-news&apiKey=a15bce4b34d143389058f96a45bb62b1")
  })
  .then(response => {
   res.locals.data = response.data.articles
    next();
  })
  .catch(err => {
        console.log(
          "Error encountered in axios call in fetcher, error:",
          err
        );
      });
  
}
// fetch a single train's data from the mta API: http://www.mtastat.us/api/trains/${name}
// trains.showTrain = (req, res, next) => {
// const name = req.params.name
// axios({
//     method: "get",
//     url: (`http://www.mtastat.us/api/trains/${name}`)
//   })
//   .then(response => {
//     res.local.data = response.data
//   })
//   .catch(err => {
//         console.log(
//           "Error encountered in axios call in pokemonNameSeedStep, error:",
//           err
//         );
//       });
//   next();
// }


module.exports = Fetcher;
