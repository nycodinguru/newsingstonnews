const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mustacheExpress = require('mustache-express');
const authObject = require("./services/auth.js")
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('logger');
var weather = require('weather-js');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

const auth = require('./services/auth.js');
app.use(auth.passportInstance);
app.use(auth.passportSession);

// app.use(logger('dev'));
app.use(cookieParser());

const newsingtonRouter = require('./controllers/newsapp.js');

app.use('/newsington', newsingtonRouter);

const userRouter = require('./controllers/users.js');

app.use('/newsington/users', userRouter);

// app.get('/', (req, res) => {
//   res.render('main');
// });

app.use((err, req, res, next) => {
  console.log('Error encountered:', err);
  res.status(500);
  res.send(err);
});

app.listen(PORT, () => { console.log("Server started on " + PORT); });
