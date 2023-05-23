const https = require("https");
const hostname = 'fourfiftytwo.local';

const express = require("express");
const app = express();

const fs = require("fs");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
res.writeHead(200);
res.end("nodejs ssl pagman");
});

const options = {
key: fs.readFileSync("./nodejsprivate.pem"),
cert: fs.readFileSync("./nodejs_server_crt.pem"),
};

https.createServer(options, app)
.listen(3000, function (req, res) {
console.log("Server started at port 3000");
});
