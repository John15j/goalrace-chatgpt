const eventConsole = document.getElementById("eventConsole");
const clientCount = document.getElementById("clientCount");
const connectionText = document.getElementById("connectionText");
const connectionDot = document.getElementById("connectionDot");

GoalRaceSocket.onOpen(() => {

    connectionText.textContent = "Connected";

    connectionDot.style.background = "#35d07f";

    addEvent("WebSocket Connected");

});

GoalRaceSocket.onClose(() => {

    connectionText.textContent = "Disconnected";

    connectionDot.style.background = "#ff4d4d";

    addEvent("WebSocket Disconnected");

});
function addEvent(text){

    const row = document.createElement("div");

    row.textContent =
        `[${new Date().toLocaleTimeString()}] ${text}`;

    eventConsole.prepend(row);
    

}

addEvent("Dashboard Ready");

GoalRaceSocket.onMessage(message=>{

    switch(message.type){

        case "client_count":

            clientCount.textContent = message.count;

            addEvent(`Clients: ${message.count}`);

            break;

        case "server_status":

            addEvent("Connected to Server");

            break;

        case "admin_test":

            addEvent(`TEST EVENT → ${message.event}`);

            break;
            case "event":

    addEvent(`EVENT → ${message.event}`);

    break;

    }

});
const TEST_DATA = {

    usernames: [

        "JoseHN",
        "MariaGT",
        "Carlos504",
        "EmilyUSA",
        "KevinCR",
        "DanielPA",
        "AnaSV",
        "LuisMEX",
        "AngelHN",
        "SoccerFan22",
        "TikTokPro",
        "GoalKing",
        "FootballGirl",
        "Legend504",
        "FastRunner"

    ],

    countries: [

        "Honduras",
        "Mexico",
        "Guatemala",
        "El Salvador",
        "Nicaragua",
        "Costa Rica",
        "Panama",
        "USA"

    ],

    comments: [

        "HON",
        "MEX",
        "USA",
        "GOAL!",
        "🔥🔥🔥",
        "LET'S GO!",
        "COME ON!",
        "⚽⚽⚽"

    ],

    gifts: [

        "Rose",
        "Donut",
        "Perfume",
        "Galaxy",
        "Lion",
        "Universe"

    ]

};

function randomItem(array){

    return array[Math.floor(Math.random()*array.length)];

}

const sendTestEvent = (eventName)=>{

    GoalRaceSocket.send({

        type:"event",

        event:eventName,

        source:"admin",

        timestamp:Date.now(),

        payload:{

            username:randomItem(TEST_DATA.usernames),

            country:randomItem(TEST_DATA.countries),

            comment:randomItem(TEST_DATA.comments),

            gift:randomItem(TEST_DATA.gifts),

            likeCount:Math.floor(Math.random()*250)+1

        }

    });

};

document
.getElementById("likeBtn")
.onclick=()=>sendTestEvent("like");

document
.getElementById("commentBtn")
.onclick=()=>sendTestEvent("comment");

document
.getElementById("giftBtn")
.onclick=()=>sendTestEvent("gift");

document
.getElementById("followBtn")
.onclick=()=>sendTestEvent("follow");