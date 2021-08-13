/**
 * modules
 */
const express = require("express");
const bodyParser = require("body-parser");
/**
 * files
 */
const getPlantState = require("./getPlantState.js");
const uploadImages = require("./uploadImages.js");
const manageSettings = require("./manageSettings.js");

const app = express();

app.use(express.static('app')); // use this as resource  directory
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile('/home/admin/ServerSerraAutomatizzata/index.html');
});

app.get('/getStatus', getPlantState.getStatus);

app.get('/getLatestImage', getPlantState.getLatestImage);

app.post('/uploadImage', uploadImages.uploadImage);

app.get('/getSettings', manageSettings.getSettings);

app.post('/changeSettings', manageSettings.changeSettings);

const port = 4200;

app.listen(port, () => {
    console.log("server listening on port " + port);
});
