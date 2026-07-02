/**
 * ==========================================================
 * GOALRACE ENGINE
 * Configuration
 * Version: 0.2.0
 * ==========================================================
 *
 * This file contains ONLY configuration values.
 * Do not place game logic here.
 */

module.exports = {

    project: {
        name: "GOALRACE ENGINE",
        version: "0.2.0",
        stage: "Phase 2 - Test Mode"
    },

    server: {
        host: "0.0.0.0",
        port: 3000
    },

    websocket: {
        heartbeatInterval: 30000,
        reconnectDelay: 3000
    },

    logging: {
        timestamps: true,
        colors: true
    },

   testMode: {

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

    comments: [

        "HON",
        "MEX",
        "USA",
        "GO GO GO",
        "LET'S GO",
        "🔥🔥🔥",
        "⚽⚽⚽",
        "WIN",
        "GOAL",
        "COME ON",
        "HONDURAS",
        "MEXICO",
        "GUATEMALA",
        "EL SALVADOR",
        "NICARAGUA",
        "COSTA RICA",
        "PANAMA"

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

    gifts: [

        "Rose",
        "TikTok",
        "Perfume",
        "Donut",
        "Heart Me",
        "Galaxy",
        "Lion",
        "Universe"

    ]

}

};