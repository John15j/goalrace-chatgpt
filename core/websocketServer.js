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

        socket.on("message", raw => {

            let message;

            try {

                message = JSON.parse(raw);

            } catch {

                console.error("Invalid JSON received.");

                return;

            }

            switch (message.type) {

                case "admin_test":

                    console.log("Admin Test:", message.event);

                    broadcast(message);

                    break;

                default:

                    console.log("Unknown Message:", message.type);

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