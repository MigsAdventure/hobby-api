"use strict"
const router = require('express').Router();
const axios = require('axios');
const formidable = require('formidable');
var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

router.route('/fetch-plate')
.post((req, res) => {

    var form = new formidable.IncomingForm();

    form.multiples = true;

    form.keepExtensions = true;

    var newImage = '';
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/images/' + file.name;
        newImage = file.path;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });


//handle entry fields and file uploads
    form.parse(req, function(err, fields, files) {
        if (err) next(err);
        //turn strings that look like objects into actual objects cause like guhdam.
        var parsedFields = {};
        for (var field in fields) {
            if (fields.hasOwnProperty(field)) {
                try {
                    parsedFields[field] = JSON.parse(fields[field]);
                } catch (e) {
                    parsedFields[field] = fields[field];
                }
            }
        }

        parsedFields.image = files[Object.keys(files)[0]].name;//first file name only
        // parsedFields.viewsPath = path.resolve('views',parsedFields.game);
    const SECRET = process.env.LICENSE_PLATE_SECRET;
  const fetch_plate_endpoint = 'https://api.openalpr.com/v2/recognize_bytes';
  const query = `?recognize_vehicle=1&country=us&secret_key=${SECRET}`;

  const endpoint_url= `${fetch_plate_endpoint}?${query}`;

  let sendImage = base64_encode(newImage);
    axios.post(endpoint_url, sendImage )
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('ERROR', err);
    });
    });

});

module.exports = router;
