"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

// Core Modules
// let path = require("path");

// Dependencies
let express = require("express");
// let favicon = require("serve-favicon");
let bodyParser = require("body-parser");
let cors = require("cors");
let helmet = require("helmet");

// Utils
let conf = require("./utils/configHandler");
let log = require("./utils/logger");
let meta = require("./utils/meta");

// Services
let portHandler = require("./services/portCheck");
let getRoutes = require("./services/getRoutes");

// Endpoints
let router = require("./routes/router");

let version = conf.getVersion();
let appname = conf.getName();
let devname = conf.getAuthor();

let splashPadding = 12 + appname.length + version.toString().length;

console.log(
    "\n" +
    ` #${"-".repeat(splashPadding)}#\n` +
    ` # Started ${appname} v${version} #\n` +
    ` #${"-".repeat(splashPadding)}#\n\n` +
    ` Copyright (c) ${(new Date()).getFullYear()} ${devname}\n`
);

let app = express();

log.done("Started.");

meta((data) => {
    log.info(`NodeJS Version: ${data.nodeversion}`);
    log.info(`Operating System: ${data.os}`);
    log.info(`Server IP: ${data.ip}`);
});

let config = conf.getConfig();

app.enable("trust proxy");

app.set("port", portHandler(config.server.port));

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// app.use(favicon(path.resolve("src", "assets", "favicon.png")));

// API's
app.use("/", router);

let routes = getRoutes(router);
for (let i in routes) log.info(`Route ${routes[i].path} registered with methods ${(routes[i].methods).join(", ")}`);

process.on("unhandledRejection", (err, promise) => {
    log.error(`Unhandled rejection (promise: ${promise}, reason: ${err})`);
});

app.listen(app.get("port"), (err) => {
    if (err){
        log.error(`Error on port ${app.get("port")}: ${err}`);
        process.exit(1);
    }
    log.info(`Listening on port ${app.get("port")}...`);
});
