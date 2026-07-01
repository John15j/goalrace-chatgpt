/*
==================================================
GOALRACE ENGINE
Health Endpoint
==================================================
*/

module.exports = function(app, config, clients){

    app.get("/health",(req,res)=>{

        res.json({

            project: config.project.name,
            version: config.project.version,
            stage: config.project.stage,
            status: "online",
            clients: clients.getClientCount(),
            uptime: Math.floor(process.uptime())

        });

    });

};