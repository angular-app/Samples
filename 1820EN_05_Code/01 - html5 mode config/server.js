var http = require('http'),
  url = require('url'),
  path = require('path'),
  fs = require('fs');

var mimeTypes = {
  "html":"text/html",
  "js":"text/javascript",
  "css":"text/css"};

http.createServer(function (req, res) {

  var uri = url.parse(req.url).pathname;
  var filename = path.join(process.cwd(), uri);

  try {
    var requestedFileStat = fs.statSync(filename);
    if (!requestedFileStat.isFile()) {
      filename = path.join(process.cwd(), 'index.html');
    }
  } catch(e) {
    console.log(e);
    filename = path.join(process.cwd(), 'index.html');
  }

  var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
  res.writeHead(200, {'Content-Type':mimeType});

  var fileStream = fs.createReadStream(filename);
  fileStream.pipe(res);

}).listen(8000);