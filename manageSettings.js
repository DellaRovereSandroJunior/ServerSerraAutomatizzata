module.exports = {
    getSettings: function (req, res) {
        getSettings(req, res);
    },
    changeSettings: function(req, res){
        changeSettings(req, res)
    }
};

const path = "/home/sandro/Scrivania/Server Serra/server/settings.json";
const settings = require(path);
const formidable = require("formidable");
const fs = require("fs");

function getSettings (req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Errore nella richiesta, riprovare');
    });

    res.set('Content-Type', 'application/json');
    res.json(settings, function(){
        res.end();
    });

}

var form = new formidable.IncomingForm();

function changeSettings(req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Errore nella richiesta, riprovare');
    });

    form.parse(req, function (err, field, file){
        var temperatura_min = field.temperatura_min;
        var temperatura_max = field.temperatura_max;
        var umidita_aria_min = field.umidita_aria_min;
        var umidita_aria_max = field.umidita_aria_max;
        var umidita_terreno_min = field.umidita_terreno_max;
        var umidita_terreno_max = field.umidita_terreno_max;
        var orari_illuminazione_artificiale = field.orari_illuminazione_artificiale;
        var newSettings = {
            "temperatura_min": temperatura_min,
            "rtemperatura_max": temperatura_max,
            "umidita_aria_min": umidita_aria_min,
            "umidita_aria_max": umidita_aria_max,
            "umidita_terreno_min": umidita_terreno_min,
            "umidita_terreno_max": umidita_terreno_max,
            "orari_illuminazione_artificiale": orari_illuminazione_artificiale
        }
        fs.writeFile(path, JSON.stringify(newSettings, null, 2), { flag: 'w+' }, function(err){
            if(err) throw err;
            res.set('Content-Type', 'application/json');

            res.end();
        });
    });
}