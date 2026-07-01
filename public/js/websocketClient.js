/*
==================================================
GOALRACE ENGINE
WebSocket Client
==================================================
*/

const GoalRaceSocket = (() => {

    let socket = null;

    const messageListeners = [];
    const openListeners = [];
    const closeListeners = [];

    function connect() {

        const protocol =
            location.protocol === "https:" ? "wss://" : "ws://";

        socket = new WebSocket(protocol + location.host);

        socket.addEventListener("open", () => {

            console.log("WebSocket Connected");

            openListeners.forEach(fn => fn());

        });

        socket.addEventListener("close", () => {

            console.log("WebSocket Disconnected");

            closeListeners.forEach(fn => fn());

            setTimeout(connect, 3000);

        });

        socket.addEventListener("message", event => {

            let data;

            try {

                data = JSON.parse(event.data);

            } catch (err) {

                console.error("Invalid WebSocket JSON", err);

                return;

            }

            messageListeners.forEach(fn => fn(data));

        });

    }

    connect();

    return {

        send(data) {

            if (!socket) return;

            if (socket.readyState !== WebSocket.OPEN) return;

            socket.send(JSON.stringify(data));

        },

        onMessage(fn) {

            messageListeners.push(fn);

        },

        onOpen(fn) {

            openListeners.push(fn);

        },

        onClose(fn) {

            closeListeners.push(fn);

        }

    };

})();