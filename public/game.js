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

    const scoreboard = document.getElementById("scoreboard");

    const rankings = Object.entries(countryScores)
        .sort((a,b)=>b[1]-a[1]);

    scoreboard.innerHTML = "";

    rankings.forEach(([country,score],index)=>{

        const row = document.createElement("div");

        row.className = "countryScore";

        let medal = "";

        if(index===0) medal = "🥇";
        else if(index===1) medal = "🥈";
        else if(index===2) medal = "🥉";

        const flags = {

            Honduras:"🇭🇳",
            Mexico:"🇲🇽",
            Guatemala:"🇬🇹",
            "El Salvador":"🇸🇻",
            Nicaragua:"🇳🇮",
            "Costa Rica":"🇨🇷",
            Panama:"🇵🇦",
            USA:"🇺🇸"

        };

        row.innerHTML = `
            <div>${medal} ${flags[country]} ${country}</div>
            <span>${score.toLocaleString()}</span>
        `;

        scoreboard.appendChild(row);

    });

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

    console.log("GAME EVENT", message);

    if (message.version) {

        const version = document.getElementById("version");

        if (version) {

            version.textContent = "Version " + message.version;

        }

    }

    if (message.type !== "event") return;

    const payload = message.payload || {};

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
updateScoreboard();