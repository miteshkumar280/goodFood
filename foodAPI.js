var express = require('express');
var router = express.Router();
const appC = require('../../app');
const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
var router = Express.Router();
const config = require('../../config/config')
var app = Express();
var cors = require('cors');


router.post("/postFood", (request, response) => {
    MongoClient.connect(config.CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(config.DATABASE_NAME);
        collection = database.collection(config.COLLECTION_NAME);
        console.log("request is",request.body);
        collection.insertMany(request.body, (error, result) => {
            console.log("INside post Chicken 1")
            if (error) {
                console.log("INside post Chicken 2")
                return response.status(500).send(error);
            }   
            console.log("INside post Chicken 3")
            response.send(result.result);
        })
        });
    console.log("INside post Chicken 4")
});


router.post("/getFood", (request, response) => {
    MongoClient.connect(config.CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(config.DATABASE_NAME);
        collection = database.collection(config.COLLECTION_NAME);
        console.log(request.body.ingredient1);
        console.log(request.body.ingredient2);
        console.log(request.body.ingredient3);
        let ingredient1 = request.body.ingredient1;
        let ingredient2 = request.body.ingredient2;
        let ingredient3 = request.body.ingredient2;
        
        collection.find({ingredient1 : ingredient1}, {ingredient2 : ingredient2}, {ingredient1 : ingredient3}).toArray((error, result) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
        console.log("INside get Chicken")
    });
    console.log("INside post Chicken 4")
});

router.post("/getSimilarFood", (request, response) => {
    MongoClient.connect(config.CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if (error) {
            throw error;
        }
        database = client.db(config.DATABASE_NAME);
        collection = database.collection(config.COLLECTION_NAME);
        console.log(request.body.ingredient1);
        let ingredient1 = request.body.ingredient1;
        
        collection.find({ingredient1 : ingredient1}).toArray((error, result) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.send(result);
        });
        console.log("INside get Chicken")
    });
    console.log("INside post Chicken 4")
});

module.exports = router;
