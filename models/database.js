var pg = require('pg');
var fs = require('fs');
var thumb = require('node-thumbnail').thumb;

function handleError(err) {
      if(!err) return false;
      if(client){
            done(client);
      }
      return true;
}

var conString = 'postgres://localhost:5432/salaatti';

module.exports = {
      list: function (callback) {
            var rows = [];
            pg.connect(conString, function(err, client, done) {
                  if(handleError(err)) return;

                  var qr = client.query('SELECT filename, name, mimetype, comment, to_char(time, \'YYYY-MM-DD HH24:MI\') as time, uploader, modkey FROM files ORDER BY id DESC');
                  qr.on('row', function(row,result) {
                        rows.push(row);
                  });
                  qr.on('end', function() {
                        done();
                        callback(rows);
                  });
            });
      },
      upload: function(body, file, callback) {
            var rows = [];
            pg.connect(conString, function(err, client, done) {
                  if(handleError(err)) return;

                  var d= new Date();
                  var isodate = d.getFullYear() + "-" + d.getMonth()+1 + "-" + d.getDate()
                        + " " + d.getHours() + ":" + d.getMinutes();
                  isodate = "now";
                  var qr = client.query("INSERT INTO files \
                              (filename, name, mimetype, comment, time, uploader, modkey ) \
                              VALUES ($1, $2, $3, $4, $5, $6, $7)", 
                              [file.filename, body.name, file.mimetype, body.comment, isodate,
                              body.sender, body.modkey]);
                  qr.on('error', function(error) {
                        done();
                        console.log(error);
                        callback(error);
                  });
                  qr.on('end', function() {
                        done();
                        thumb({
                              source: './files/',
                              destination: './thumbnails',
                              concurrency: 4,
                              suffix: '',
                              width: 150,
                              overwrite: true,
                        }, function(err) {
                              console.log('thumbs done');
                              console.log(err);
                        });
                        callback("Upload succesful?");
                  });
            });
      }
}

