"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

let log = require("../utils/logger");

/**
 * Check if the given port is correct.
 * Return default port if not specified.
 *
 * @param {number} port
 * @returns {number} port
 */
module.exports = function(port){
    const appPort = port || 3000;

    if (!port) log.warn("No port specified. Using default: 3000");

    if (appPort < 1 || appPort > 65535){
        log.error(`Invalid port specified: ${appPort}\nStopping...`);
        return process.exit(1);
    }

    return appPort;
};
