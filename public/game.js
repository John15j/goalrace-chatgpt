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

   const payload = message.payload || {};

switch (message.event) {

    case "like":

        liveFeed.innerHTML = `
            ❤️ <strong>${payload.username}</strong><br>
            👍 ${payload.likeCount} Likes
        `;

        break;

    case "comment":

        liveFeed.innerHTML = `
            💬 <strong>${payload.username}</strong><br>
            ${payload.comment}<br>
            🌎 ${payload.country}
        `;

        break;

    case "gift":

        liveFeed.innerHTML = `
            🎁 <strong>${payload.username}</strong><br>
            Sent: ${payload.gift}<br>
            🌎 ${payload.country}
        `;

        break;

    case "follow":

        liveFeed.innerHTML = `
            ➕ <strong>${payload.username}</strong><br>
            New Follower<br>
            🌎 ${payload.country}
        `;

        break;

}

});