var pg = require('pg');

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

                  var qr = client.query('SELECT filename, mimetype, comment, time, uploader, modkey FROM files');
                  qr.on('row', function(row,result) {
                        rows.push(row);
                        console.log(row);
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
                  var qr = client.query("INSERT INTO files \
                              (filename, mimetype, comment, time, uploader, modkey ) \
                              VALUES ($1, $2, $3, $4, $5, $6)", 
                              [file.filename,file.mimetype, body.comment, isodate,
                              body.sender, body.modkey]);
                  qr.on('error', function(error) {
                        done();
                        console.log(error);
                        callback(false);
                  });
                  qr.on('end', function() {
                        done();
                        callback(true);
                  });
            });
      }
}

