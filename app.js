var express = require('express');
var app = express();
var multer = require('multer');

var index = require('./models/index');
var upload = require('./models/upload');

var Hashids = require("hashids");
hashids = new Hashids("tööt tööt tööt", 8);

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', index.dispatch);

app.get('/upload', upload.dispatch);
var storage = multer.diskStorage({
      destination: function( req, file, cb) {
            cb(null,'files')
      },
      filename: function(req, file, cb) {
            cb(null, hashids.encode(Date.now()) + "-" + file.originalname)
      }
});
var upmulter = multer({storage: storage});
app.post('/', upmulter.single('file'), upload.upload); 
app.use(express.static('static'));
app.use(express.static('files'));


app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});
