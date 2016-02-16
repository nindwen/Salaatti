var fs = require("fs");
var hl = require("highlight.js");
function getExtension(filename) {
      return filename.substr((~-filename.lastIndexOf(".") >>> 0) + 2);
}

module.exports = {
      parse: function(req,res) {
            var fname = req.params[0];
            var extension = getExtension(fname);

            switch(extension) {
                  case "png":
                  case "jpg":
                  case "jpeg":
                  case "bmp":
                        res.render("preview",{ file: fname, type: "image" });
                        break;
                  case "ogg":
                  case "midi":
                  case "mid":
                  case "mp3":
                  case "wav":
                        res.render("preview",{ file: fname, type: "music" });
                        break;
                  default:
                        var data = fs.readFileSync("/home/public/files/" + fname,"utf8");
                        var hilit = hl.highlightAuto(data);
                        if(hilit.language == "") {
                              res.send("lol ei sry");
                        }
                        else {
                              res.render("preview",{ file: fname, type: "text", data: hilit.value });
                        }
                        break;
            }
      }

}
