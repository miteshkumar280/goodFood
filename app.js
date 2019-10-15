const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var router = Express.Router();
const config = require('./config/config')
var app = Express();
var cors = require('cors');

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

app.listen(3001, () =>{
    MongoClient.connect(config.CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        throw error;
    }
    database = client.db(config.DATABASE_NAME);
    collection = database.collection(config.COLLECTION_NAME);
    console.log("Connected to `" + config.DATABASE_NAME + "`!");
    console.log("Connected to `" + database + "`!");
    console.log("collection anme" + config.COLLECTION_NAME);
    })

});

var foodLogsAPI = require('./routes/foodAPI/foodAPI');
app.use(cors());
app.use('/foodAPI', foodLogsAPI);


app.use(function (req, res, next) {
    // var err = new Error('Not Found');
    // err.status = 404;
    // next(err);
     // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
  });

  app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
      message: err.message,
      error: {}
    });
  });

module.exports = app;
exports.Collection = collection;
