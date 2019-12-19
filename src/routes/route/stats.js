"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

// Utils
let meta = require("../../utils/meta");

// Services
let responder = require("../../services/responder");

/**
 * Sends status informations and meta data
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
let stats = function(req, res){
    meta((data) => {
        let response = {
            "status": "ok",
            "nodejs_vserion": data.nodeversion,
            "current_pid": process.pid,
            "uptime_seconds": Math.floor(process.uptime()),
            "operating_system": data.os,
            "system_cpu_usage_time": process.cpuUsage().system,
            "user_cpu_usage_time": process.cpuUsage().user,
            "arch": process.arch,
            "server_ip": data.ip,
            "client_ip": (req.headers["x-forwarded-for"] || req.connection.remoteAddress)
        };

        responder(res, response, 200);
    });
};

module.exports = stats;
