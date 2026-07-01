/*
==================================================
GOALRACE ENGINE
Broadcast Bootstrap
==================================================
*/

const liveFeed = document.getElementById("liveFeed");

const connectionText = document.getElementById("connectionText");
const connectionDot = document.getElementById("connectionDot");

/*
==================================================
Connection Status
==================================================
*/

GoalRaceSocket.onOpen(() => {

    connectionText.textContent = "Connected";

    connectionDot.style.background = "#35d07f";

});

GoalRaceSocket.onClose(() => {

    connectionText.textContent = "Disconnected";

    connectionDot.style.background = "#ff4d4d";

});

/*
==================================================
Incoming Events
==================================================
*/

GoalRaceSocket.onMessage(message => {

    console.log("GAME EVENT", message);

    if (message.version) {

        const version = document.getElementById("version");

        if (version) {

            version.textContent = "Version " + message.version;

        }

    }

    if (message.type !== "event") return;

    switch (message.event) {

        case "like":

            liveFeed.textContent =
                "👍 Someone liked the stream";

            break;

        case "comment":

            liveFeed.textContent =
                "💬 Someone commented";

            break;

        case "gift":

            liveFeed.textContent =
                "🎁 Someone sent a gift";

            break;

        case "follow":

            liveFeed.textContent =
                "➕ Someone followed";

            break;

    }

});