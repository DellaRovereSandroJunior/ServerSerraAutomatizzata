module.exports = {
    uploadImage: function (req, res) {
        uploadImage(req, res);
    }
};

const formidable = require("formidable");
const fs = require("fs");

var form = new formidable.IncomingForm();

function uploadImage(req, res) {
    res.on('error', function () {
        res.set('Content-Type', 'text/plain');
        res.status(404).end('Request error, try again');
    });

    form.parse(req, function (err, field, file) {
        var fileName = file.filetoupload.name;
        var oldpath = file.filetoupload.path;
        var newpath = './plantImages/' + fileName;
        var date = fileName.substring(6, 8)+"/"+
                    fileName.substring(4, 6)+"/"+
                    fileName.substring(0, 4)+" "+
                    fileName.substring(8, 10)+":"+
                    fileName.substring(10, 12);
        fs.writeFile('./latestImage/date.txt', date, { flag: 'w+' }, function(err){
            if(err) throw err;
        });
        fs.copyFile(oldpath, newpath, function (err) {
            if (err) throw err;
            fs.copyFile(newpath, './latestImage/latest.jpg', function(err){
                if(err) throw err;
                res.end();
            });
        });
    });
}