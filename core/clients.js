/*
==================================================
GOALRACE ENGINE
Connected Clients
==================================================
*/

let connectedClients = 0;

function addClient() {
    connectedClients++;
}

function removeClient() {
    connectedClients = Math.max(0, connectedClients - 1);
}

function getClientCount() {
    return connectedClients;
}

module.exports = {
    addClient,
    removeClient,
    getClientCount
};