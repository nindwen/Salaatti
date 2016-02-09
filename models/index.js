db = require("./database"); 
module.exports = {
      dispatch: function (req, res) {
            db.list(function(rows) {
                  res.render('index', { title: 'Salaatti', message: req.params[0], imgs: rows});

            });




      },
}
