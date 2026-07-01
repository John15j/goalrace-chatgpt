/*
==================================================
GOALRACE ENGINE
Shared WebSocket Client
==================================================
*/

(() => {

    const protocol = location.protocol === "https:" ? "wss" : "ws";

    const socketUrl = `${protocol}://${location.host}`;

    let socket = null;

    let reconnectTimer = null;

    const listeners = [];

    function updateStatus(connected) {

        const dot = document.getElementById("connectionDot");
        const text = document.getElementById("connectionText");

        if (!dot || !text) return;

        if (connected) {

            dot.style.background = "#3DDC84";
            dot.style.boxShadow = "0 0 12px #3DDC84";

            text.textContent = "Connected";

        } else {

            dot.style.background = "#FF4F4F";
            dot.style.boxShadow = "0 0 12px #FF4F4F";

            text.textContent = "Disconnected";

        }

    }

    function connect() {

        socket = new WebSocket(socketUrl);

        socket.addEventListener("open", () => {

            console.log("WebSocket Connected");

            updateStatus(true);

        });

        socket.addEventListener("message", event => {

            let data;

            try {

                data = JSON.parse(event.data);

            } catch {

                return;

            }

            listeners.forEach(fn => fn(data));

        });

        socket.addEventListener("close", () => {

            console.log("WebSocket Closed");

            updateStatus(false);

            clearTimeout(reconnectTimer);

            reconnectTimer = setTimeout(connect,3000);

        });

        socket.addEventListener("error", err => {

            console.error(err);

        });

    }

    connect();

    window.GoalRaceSocket = {

        onMessage(callback){

            listeners.push(callback);

        }

    };

})();
GoalRaceSocket.send = function(data){

    if(socket && socket.readyState === WebSocket.OPEN){

        socket.send(JSON.stringify(data));

    }

};