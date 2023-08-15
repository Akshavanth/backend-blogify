const http = require("http");
const express = require("express");

const app = express();

const server = http.createServer(app);

const PORT = process.env.PORT || 9080;

server.listen(app, console.log(`server is listening on ${PORT}`));
