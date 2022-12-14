require('dotenv').config(); 
const myClient = require('./managers/connection');
const Sentry = require("@sentry/node");
const cors = require("cors");

const Tracing = require("@sentry/tracing");

const validateToken = require('./middlewares/validateToken')
// variables to autenticate by token
Sentry.init({
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
}, 99);
var app = require('express')();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(cors());

//route for requested Authoritation petitions
app.use(process.env.ROOT_LOGGED,validateToken, require('./routes'));

//route for non requested Authoritation petitions
app.use(process.env.ROOT, require('./routes'));


app.post('/api/login', require('./controllers/loginController'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
console.log('Working!!!');
myClient()
});