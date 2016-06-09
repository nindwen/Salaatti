db = require("./database"); 

module.exports = {
      dispatch: function (req, res) {
            res.render('upload-form',{});
      },

      upload: function (req, res, next) {
            db.upload(req.body, req.file, function(error) {
                  res.redirect('/msg-'+error);
            });
      },

}
