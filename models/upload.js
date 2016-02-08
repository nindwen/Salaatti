db = require("./database"); 

module.exports = {
      dispatch: function (req, res) {
            res.render('upload-form',{});
      },

      upload: function (req, res, file) {
            console.log(req.body);
            console.log(req.file);
            if(req.body.visible == 'on') {
                  db.upload(req.body, req.file, function(ok) {
                        res.redirect('/');
                  });
            }
            else {
                  res.send(file.filename);
            }
      },

}
