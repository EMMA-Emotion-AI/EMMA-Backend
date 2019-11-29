"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

let nodev = process.version;
let osinfo = process.platform;

/**
 * Categorizes in IPv4, IPv6, Internal and Localhost
 *
 * @param {*} dev
 * @param {*} ifaces
 * @returns
 */
let filterDevVal = function(dev, ifaces){
    let address;
    ifaces[dev].filter(details => {
        details.family === "IPv4" && details.internal === false ? address = details.address : undefined;
    });
    return address;
};

/**
 * Retrieves the current internal IP address
 *
 * @returns {string} address
 */
let getIp = function(){
    let address;
    let ifaces = require("os").networkInterfaces();
    for (let dev in ifaces) address = filterDevVal(dev, ifaces);
    return address;
};

module.exports = function(callback){
    let metadata = {};

    metadata.nodeversion = nodev;
    metadata.os = osinfo;
    metadata.ip = getIp();

    return callback(metadata);
};
