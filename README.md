# imagify
Browserify transform which allow you to require images in your code.

```
const logo = require('../images/logo.svg');

...
<div className="logo" dangerouslySetInnerHTML={{__html: logo}} />
...
``
