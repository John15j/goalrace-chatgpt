/**
 * ==========================================================
 * GOALRACE ENGINE
 * Server
 * Version: 0.1.0
 * ==========================================================
 */

const express = require("express");
const http = require("http");
const path = require("path");
const { WebSocketServer } = require("ws");

const config = require("./config");

const app = express();
const server = http.createServer(app);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Create WebSocket server
const wss = new WebSocketServer({ server });

let connectedClients = 0;

wss.on("connection", (socket) => {
    connectedClients++;

    console.log(`🟢 Client Connected (${connectedClients})`);

    socket.send(JSON.stringify({
        type: "connection",
        status: "connected",
        version: config.project.version
    }));

    socket.on("close", () => {
        connectedClients--;
        console.log(`🔴 Client Disconnected (${connectedClients})`);
    });

    socket.on("error", (err) => {
        console.error("WebSocket Error:", err.message);
    });
});
// Health endpoint
app.get("/health", (req, res) => {
    res.json({
        project: config.project.name,
        version: config.project.version,
        stage: config.project.stage,
        status: "online",
        connectedClients,
        uptime: Math.floor(process.uptime())
    });
});
server.listen(config.server.port, config.server.host, () => {

    console.clear();

    console.log("========================================");
    console.log("GOALRACE ENGINE");
    console.log("========================================");
    console.log(`Version : ${config.project.version}`);
    console.log(`Stage   : ${config.project.stage}`);
    console.log("");
    console.log("✓ Express Server Running");
    console.log("✓ WebSocket Server Running");
    console.log("");
    console.log(`Broadcast : http://localhost:${config.server.port}`);
    console.log(`Admin     : http://localhost:${config.server.port}/admin.html`);
    console.log("");
    console.log("Waiting for connections...");
});