/*
==================================================
GOALRACE ENGINE
Server Bootstrap
==================================================
*/

const express = require("express");
const http = require("http");
const path = require("path");

const config = require("./config");

const logger = require("./core/logger");
const clients = require("./core/clients");

const createHealthEndpoint = require("./core/health");
const createWebSocketServer = require("./core/websocketServer");

const app = express();

const server = http.createServer(app);

app.use(express.static(path.join(__dirname,"public")));

createHealthEndpoint(app,config,clients);

createWebSocketServer(server, config, clients);

server.listen(config.server.port,config.server.host,()=>{

    console.clear();

    console.log("========================================");
    console.log(config.project.name);
    console.log("========================================");
    console.log(`Version : ${config.project.version}`);
    console.log(`Stage   : ${config.project.stage}`);
    console.log("");

    logger.info("Express Server Running");
    logger.info("WebSocket Server Running");

    console.log("");

    console.log(`Broadcast : http://localhost:${config.server.port}`);
    console.log(`Admin     : http://localhost:${config.server.port}/admin.html`);

    console.log("");

    console.log("Waiting for connections...");

});