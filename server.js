
var express = require("express");
var bodyParser = require("body-parser");

var app = express();
var path = require('path');
// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text());

require("./routing/apiRoutes")(app);
require("./routing/htmlRoutes")(app);

 
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
}); 