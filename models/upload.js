db = require("./database"); 

module.exports = {
      dispatch: function (req, res) {
            res.render('upload-form',{});

      },

      upload: function (req, res) {
            console.log(req.body);
            res.send("lol");


      },

}
