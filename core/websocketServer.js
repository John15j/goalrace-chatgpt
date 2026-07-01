/*
==================================================
GOALRACE ENGINE
WebSocket Server
==================================================
*/

const { WebSocketServer } = require("ws");

module.exports = function (server, config, clients) {

    const wss = new WebSocketServer({ server });

    function broadcast(message) {

        const json = JSON.stringify(message);

        wss.clients.forEach(client => {

            if (client.readyState === 1) {

                client.send(json);

            }

        });

    }

    wss.on("connection", socket => {

        clients.addClient();

        console.log(`🟢 Client Connected (${clients.getClientCount()})`);

        broadcast({
            type: "client_count",
            count: clients.getClientCount()
        });

        socket.send(JSON.stringify({
            type: "server_status",
            status: "connected",
            version: config.project.version
        }));

       const eventQueue = [];

setInterval(() => {

    if (eventQueue.length === 0) return;

    const event = eventQueue.shift();

    broadcast(event);

}, 40);

socket.on("message", raw => {

    let message;

    try{

        message = JSON.parse(raw);

    }catch{

        console.error("Invalid JSON");

        return;

    }

    if(message.type === "event"){

        eventQueue.push(message);

        console.log(`Queued: ${message.event}`);

    }

});

        socket.on("close", () => {

            clients.removeClient();

            console.log(`🔴 Client Disconnected (${clients.getClientCount()})`);

            broadcast({
                type: "client_count",
                count: clients.getClientCount()
            });

        });

    });

};