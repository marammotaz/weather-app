// Setup empty JS object to act as endpoint for all routes
projectData = {};

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3000;
app.listen(port, function listening() {
  console.log(`server is running on port: ${port}`);
});

//get route
app.get("/all", getData);
// Callback function to complete GET '/all'
function getData(req, res) {
  res.send(projectData);
}

//post route
app.post("/add", postFunction);
// Callback function to complete POST '/add'
function postFunction(req, res) {
  projectData ={...req.body} ;
  console.log(projectData);
  
}
