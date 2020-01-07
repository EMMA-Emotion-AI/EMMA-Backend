"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

// Classifier
let Classifier = require("./classifier");

// Utils
let isset = (obj) => !!(obj && obj !== null && (typeof obj === "string" || typeof obj === "number") || obj === 0);
let config = require("../utils/configHandler").getConfig();

// Services
let responder = require("../services/responder");

// Database
let rethink = require("rethinkdbdash")({
    host: config.database.host,
    port: config.database.port,
    db: config.database.db,
    user: config.database.user,
    password: config.database.password
});

// Entry point
let evaluate = async function(req, res){
    let text = req.query.text;

    if (!isset(text)) {
        return responder(res, {
            "error": "no text provided"
        }, 400);
    }

    let classifier = await Classifier.create(0.05, rethink);

    classifier.classify(text, (err, result) => {
        if (err){
            return responder(res, {
                "error": "internal server error"
            }, 500);
        }

        responder(res, result, 200);
    });
};

module.exports = {
    evaluate
};
