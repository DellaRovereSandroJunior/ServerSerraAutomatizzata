module.exports = {
    getSettings: function (req, res) {
        getSettings(req, res);
    },
    changeSettings: function(req, res){
        changeSettings(req, res)
    }
};

const path = "/home/admin/ServerSerraAutomatizzata/settings.json";
const formidable = require("formidable");
const fs = require("fs");

function getSettings (req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Request error, try again');
    });

    res.set('Content-Type', 'application/json');
    res.sendFile(path, function(){
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
        var min_temperature = field.min_temperature;
        var max_temperature = field.max_temperature;
        var min_air_temperature = field.min_air_temperature;
        var max_air_temperature = field.max_air_temperature;
        var min_ground_temperature = field.max_ground_temperature;
        var max_ground_temperature = field.max_ground_temperature;
        var artificial_lighting_schedule = field.artificial_lighting_schedule;
        var newSettings = {
            "name" : name,
            "min_air_temperature": min_air_temperature,
            "max_air_temperature": max_air_temperature,
            "min_air_humidity": min_air_humidity,
            "max_air_humidity": max_air_humidity,
            "min_ground_temperature": min_ground_temperature,
            "max_ground_temperature": max_ground_temperature,
            "artificial_lighting_schedule": artificial_lighting_schedule
        }
        fs.writeFile(path, JSON.stringify(newSettings, null, 2), { flag: 'w+' }, function(err){
            if(err) throw err;
            res.set('Content-Type', 'application/json');

            res.end();
        });
    });
}
