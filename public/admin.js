const eventConsole = document.getElementById("eventConsole");
const clientCount = document.getElementById("clientCount");

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
const sendTestEvent = (eventName)=>{

    GoalRaceSocket.send({

        type:"event",

        event:eventName,

        source:"admin",

        timestamp:Date.now(),

        payload:{

    username:"JoseHN",

    country:"Honduras",

    gift:"Rose",

    likeCount:30

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