/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Matthew Lee Student ID: 117715185 Date: 17/06/21
*  Heroku Link: _______________________________________________________________
*
********************************************************************************/

const RestaurantDB = require("./modules/restaurantDB.js");
const db = new RestaurantDB();

var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
// Add support for incoming JSON entities
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());

db.initialize("mongodb+srv://admin:admin@cluster0.ysxvp.mongodb.net/sample_restaurants?retryWrites=true&w=majority").then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});
// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    console.log(req.headers);
    res.json({ message: "API Listening" });
});
app.post("/api/restaurants", (req, res) => {
    if (db.addNewRestaurant(req.params)) {
        res.status(201).json({ message: `added a new restaurant` })
    };
});
app.get("/api/restaurants/:page/:perPage/:borough", (req, res) => {
    db.getAllRestaurants(req.params.page, req.params.perPage, req.params.borough)
    res.status(200).json({ message: "API Listening" });
});
app.get("/api/restaurants/:id", (req, res) => {
    db.getRestaurantById(req.params.id);
    res.json({ message: `get restaurant with id: ${req.params.id}` });
});
app.put("/api/restaurants/:id", (req, res) => {
    db.updateRestaurantById(req.params.id)
    res.json({ message: `updated: ${req.params.id}` });
});
app.delete("/api/restaurants/:id", (req, res) => {
    db.deleteRestaurantById(req.params.id);
    res.status(200)({ "message": `deleted restaurant with identifer: ${req.params.id}` });
});
// setup http server to listen on HTTP_PORT
app.listen(HTTP_PORT);
