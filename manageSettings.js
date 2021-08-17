module.exports = {
    getSettings: function (req, res) {
        getSettings(req, res);
    },
    changeSettings: function(req, res){
        changeSettings(req, res)
    },
    getAllSettings: function (req, res) {
        getAllSettings(req, res);
    }
};

const settingsPath = "/home/admin/ServerSerraAutomatizzata/settings.json";
const allSettingsPath = "/home/admin/ServerSerraAutomatizzata/allSettings.json";
const formidable = require("formidable");
const fs = require("fs");

function getSettings (req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Request error, try again');
    });

    res.set('Content-Type', 'application/json');
    res.sendFile(settingsPath, function(){
        res.end();
    });

}

function getAllSettings (req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Request error, try again');
    });

    res.set('Content-Type', 'application/json');
    res.sendFile(allSettingsPath, function(){
        res.end();
    });
}

var form = new formidable.IncomingForm();

function changeSettings(req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Request error, try again');
    });

    form.parse(req, function (err, field, file){
        var name = field.name;
        var min_air_temperature = field.min_air_temperature;
        var max_air_temperature = field.max_air_temperature;
        var min_air_humidity = field.min_air_humidity;
        var max_air_humidity = field.max_air_humidity;
        var min_ground_humidity = field.max_ground_humidity;
        var max_ground_humidity = field.max_ground_humidity;
        var artificial_lighting_schedule = field.artificial_lighting_schedule;
        var newSettings = {
            "name" : name,
            "min_air_temperature": min_air_temperature,
            "max_air_temperature": max_air_temperature,
            "min_air_humidity": min_air_humidity,
            "max_air_humidity": max_air_humidity,
            "min_ground_humidity": min_ground_humidity,
            "max_ground_humidity": max_ground_humidity,
            "artificial_lighting_schedule": artificial_lighting_schedule
        }
        fs.writeFile(settingsPath, JSON.stringify(newSettings, null, 2), { flag: 'w+' }, function(err){
            if(err) throw err;
            res.set('Content-Type', 'application/json');

            res.end();
        });
    });
}
