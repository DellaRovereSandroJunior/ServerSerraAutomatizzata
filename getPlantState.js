module.exports = {
    getStatus: function (req, res) {
        getStatus(req, res);
    },

    getLatestImage: function (req, res) {
        getLatestImage(req, res);
    },

    getLatestImageFile: function(req, res) {
        getLatestImageFile(req, res);
    }
};

const fs = require("fs");

function getStatus (req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Request error, try again');
    });

    var status = {
        temperature: "24.5",
        terrain_humidity: "63",
        air_humidity: "19",
        artificial_lighting: "spenta",
        artificial_lighting_schedule: "00-04",
        water_level: "75",
        latest_watering: "18/08/2021-15:30"
    };

    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(status, null, 2));
}

function getLatestImage (req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Request error, try again');
    });

    var date = fs.readFileSync('./latestImage/date.txt', function(err){
        if(err) throw err;
    });

    var url = req.url + "/latest.jpg";

    var latestImage= {
        url: url,
        date: date.toString()
    };

    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(latestImage, null, 2));
}

function getLatestImageFile(req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Request error, try again');
    });

    res.sendFile("/home/admin/ServerSerraAutomatizzata/latestImage/latest.jpg", function(err){
        if(err) throw err;
        res.end();
    });
}
