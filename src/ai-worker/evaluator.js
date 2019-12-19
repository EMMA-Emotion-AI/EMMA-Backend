"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

// Classifier
let Classifier = require("./classifier");

// Utils
let isset = (obj) => !!(obj && obj !== null && (typeof obj === "string" || typeof obj === "number") || obj === 0);

// Services
let responder = require("../services/responder");

// Entry point
let evaluate = function(req, res){
    let text = req.query.text;

    if (!isset(text)) {
        return responder(res, {
            "error": "no text provided"
        }, 400);
    }

    let classifier = new Classifier(0.05); // Tolerance of 0.05

    classifier.classify(text, (err, result) => {
        if (err){
            return responder(res, {
                "error": "internal server error"
            }, 500);
        }

        responder(res, {
            "status": result
        }, 200);
    });
};

module.exports = {
    evaluate
};
