var express = require('express');
var routes = require('./routes');
const port = 3000;

var app = express();
routes(app);

app.listen(port, () => {console.log(`The server is running at localhost:${port}`)});