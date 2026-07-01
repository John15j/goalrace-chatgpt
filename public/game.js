/*
==========================================
GOALRACE ENGINE
Broadcast Bootstrap
==========================================
*/

GoalRaceSocket.onMessage(data => {

    console.log("GAME EVENT",data);

    if(data.version){

        const version=document.getElementById("version");

        if(version){

            version.textContent="Version "+data.version;

        }

    }

});