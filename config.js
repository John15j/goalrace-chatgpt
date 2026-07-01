/**
 * ==========================================================
 * GOALRACE ENGINE
 * Configuration
 * Version: 0.1.0
 * ==========================================================
 *
 * This file contains ONLY configuration values.
 * Do not place game logic here.
 */

module.exports = {
    project: {
        name: "GOALRACE ENGINE",
        version: "0.1.0",
        stage: "Phase 1 - Foundation"
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
    }
};