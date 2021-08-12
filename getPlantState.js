module.exports = {
    getStatus: function (req, res) {
        getStatus(req, res);
    },

    getLatestImage: function (req, res) {
        getLatestImage(req, res);
    }
};

const fs = require("fs");

function getStatus (req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Errore nella richiesta, riprovare');
    });

    var status = {
        temperatura: "24.5",
        umidita_terreno: "63",
        umidita_aria: "19",
        illuminazione_artificiale: "spenta",
        orari_illuminazione_artificiale: "00-04",
        livello_acqua: "75",
        ultima_irrigazione: "18/08/2021-15:30"
    };

    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(status, null, 2));
}

function getLatestImage (req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Errore nella richiesta, riprovare');
    });

    var date = fs.readFileSync('./latestImage/date.txt', function(err){
        if(err) throw err;
    });
    var latestImage= {
        url: "./latestImage/latest.jpg",
        date: date.toString()
    };

    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(latestImage, null, 2));
}
