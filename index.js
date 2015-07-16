var through = require('through2');

module.exports = function (file) {
  var i = -1;
  function head(type) {
    i++;
    return i === 0 ? 'module.exports = "data:image/'+type+';base64,' : '';
  }
  function tail() {
    return '"';
  }
  function isImg(file) {
    return (/\.((lit)?gif|png|jpg|jpeg)$/).exec(file);
  }
  function isSvg(file) {
    return (/\.((lit)?svg)$/).exec(file);
  }
  function transforSvg(svg) {
    return 'module.exports = "'+svg+'";';
  }

  if (isImg(file)) {
    var type = isImg(file)[1];
    return through(
      function (buf, enc, next) {
        this.push(head(type));
        this.push(buf.toString('base64'));
        next();
      },
      function (end) {
        this.push(tail());
        end();
      }
    );
  } else if (isSvg(file)) {
    return through(
      function (buf, enc, next) {
        this.push(transforSvg(buf.toString()));
        next();
      },
      function (end) {
        end();
      }
    );
  }
  return through();
};
