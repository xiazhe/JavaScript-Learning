//Create a through stream from an asyncronous function.
var mapStream = require('map-stream');


var resources = [];

function getResources(done) {
    if (resources) return done(resources)

    resourceStream.pipe(mapStream(function (data, cb) {
        resources.push(data);
        cb(null, data);
    }))
    .on('end', function () {
        done(resources);
    });

}


module.exports = function (resourceStream) {


    
}