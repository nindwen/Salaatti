db = require("./database"); 
module.exports = {
      dispatch: function (req, res) {
            db.list(function(rows) {
                  console.log(rows);
                  res.render('index', { title: 'Salaatti', message: 'Salaatti', imgs: rows});

            });




      },
}
