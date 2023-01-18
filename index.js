require('dotenv').config(); 
const myClient = require('./managers/connection');
/* const Sentry = require("@sentry/node"); */
const cors = require("cors");
const validateToken = require('./middlewares/validateToken')

/* const Tracing = require("@sentry/tracing"); */

// variables to autenticate by token
/* Sentry.init({
  dsn: process.env.SENTRY,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
const transaction = Sentry.startTransaction({
  op: "test",
  name: "My First Test Transaction",
});

setTimeout(() => {
  try {
    foo();
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    transaction.finish();
  }
}, 99); */
var app = require('express')();
const bodyParser = require('body-parser');


app.use(bodyParser.json());



app.use(cors());
var allowlist = ['http://localhost:3000','https://63bb31e4cc97665c37181eda--lambent-faloodeh-e422e2.netlify.app/login','https://urlshortenerfront.vercel.app/*']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}




//route for requested Authoritation petitions
app.use(process.env.ROOT_LOGGED,validateToken, require('./routes'));

//route for non requested Authoritation petitions
app.use(process.env.ROOT, require('./routes'));


app.post('/api/login', cors(corsOptionsDelegate), require('./controllers/loginController'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
console.log('Working!!!');
myClient()
});