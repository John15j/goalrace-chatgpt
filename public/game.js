/*
==================================================
GOALRACE ENGINE
Broadcast Bootstrap
==================================================
*/

const liveFeed = document.getElementById("liveFeed");
const eventHistory =
    document.getElementById("eventHistory");


const connectionText = document.getElementById("connectionText");
const connectionDot = document.getElementById("connectionDot");
const countryScores = {

    Honduras:0,
    Mexico:0,
    Guatemala:0,
    "El Salvador":0,
    Nicaragua:0,
    "Costa Rica":0,
    Panama:0,
    USA:0

};

function updateScoreboard(){

    document.querySelector("#score-honduras span").textContent = countryScores.Honduras;

    document.querySelector("#score-mexico span").textContent = countryScores.Mexico;

    document.querySelector("#score-guatemala span").textContent = countryScores.Guatemala;

    document.querySelector("#score-elsalvador span").textContent = countryScores["El Salvador"];

    document.querySelector("#score-nicaragua span").textContent = countryScores.Nicaragua;

    document.querySelector("#score-costarica span").textContent = countryScores["Costa Rica"];

    document.querySelector("#score-panama span").textContent = countryScores.Panama;

    document.querySelector("#score-usa span").textContent = countryScores.USA;

}
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
if(payload.country && countryScores[payload.country] !== undefined){

    switch(message.event){

        case "like":

            countryScores[payload.country] += payload.likeCount;

            break;

        case "gift":

            countryScores[payload.country] += 500;

            break;

        case "follow":

            countryScores[payload.country] += 100;

            break;

        case "comment":

            countryScores[payload.country] += 10;

            break;

    }

    updateScoreboard();

}
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