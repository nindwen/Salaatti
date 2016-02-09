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
                        res.sendFile("/home/nindwen/usr/project/salaatti/thumbnails/" + req.params[0]);
                        break;
                  default:
                        res.sendFile("/home/nindwen/usr/project/salaatti/static/ikoni.png");
                        break;
            }
      }

}
