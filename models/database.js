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

                  var qr = client.query('SELECT filename FROM files');
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
}

