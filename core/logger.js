/*
==================================================
GOALRACE ENGINE
Logger
==================================================
*/

function info(message) {
    console.log(`✓ ${message}`);
}

function warn(message) {
    console.warn(`⚠ ${message}`);
}

function error(message) {
    console.error(`✖ ${message}`);
}

module.exports = {
    info,
    warn,
    error
};