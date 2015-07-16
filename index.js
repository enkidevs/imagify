var path = require ('path');
var t2 = require ('through2');
var fs = require ('fs');

var imgExtension = ['.png', '.jpg', '.jpeg', '.gif'];

module.exports = function(file) {
  var extension = path.extname(file);
  if(imgExtension.indexOf(extension) !== -1) {
    return t2.obj(function(data, enc, cb) {
      var self = this;
      fs.readFile(file, function(err, data) {
        var out = ["img = 'data:image/png;base64,"];
        out.push(new Buffer(data).toString('base64'));
        out.push("';module.exports = img;");
        self.push(new Buffer(out.join('')));
        cb();
      });
    });
  } else if (extension === 'svg') {
    return t2.obj(function(data, enc, cb) {
      var self = this;
      fs.readFile(file, function(err, data) {
        var out = ["img = '"];
        out.push(data);
        out.push("';module.exports = img;");
        self.push(new Buffer(out.join('')));
        cb();
      });
    });
  }
  return t2();
};
