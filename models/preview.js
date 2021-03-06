var fs = require("fs");
var hl = require("highlight.js");
var readChunk = require('read-chunk'); // npm install read-chunk 
var fileType = require('file-type');
function getExtension(filename) {
      return filename.substr((~-filename.lastIndexOf(".") >>> 0) + 2);
}

function getType(type) {
      return type.mime.replace(/\/.*$/,'');
}

module.exports = {
      parse: function(req,res) {
            var fname = req.params[0];
            var buffer = readChunk.sync('/home/public/files/' + fname, 0, 262);
            var type;
            if(fileType(buffer) == null) {
                  type = "other";
            }
            else {
                  type = getType(fileType(buffer));
            }

            if(type == "other") {
                  switch(getExtension(fname)) {
                        case "py":
                        case "lua":
                        case "java":
                        case "c":
                        case "cpp":
                        case "jade":
                        case "md":
                        case "txt":
                        case "rs":
                              type = "text";
                  }
            }

            switch(type) {
                  case "image":
                        res.render("preview",{ file: fname, type: type });
                        break;
                  case "audio":
                        res.render("preview",{ file: fname, type: type });
                        break;
                  case "text":
                        var data = fs.readFileSync("/home/public/files/" + fname,"utf8");
                        var hilit = hl.highlightAuto(data);
                        res.render("preview",{ file: fname, type: type, data: hilit.value });
                        break;
                  default:
                        res.render("preview",{ file: fname, type: "other"});
                        break;
            }
      }

}
