"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

// Classifier
let Classifier = require("./classifier");

// Utils
let isset = (obj) => !!(obj && obj !== null && (typeof obj === "string" || typeof obj === "number") || obj === 0);

// Entry point
let evaluate = function(req, res, app){
    let text = req.query.text;
    let response;

    if (!isset(text)){
        response = {
            "error": "no text provided"
        };

        return res.set({
            "Content-Type": "application/json; charset=utf-8"
        }).status(400).send(response);
    }

    let classifier = new Classifier(0.05); // Tolerance of 0.05
    classifier.classify(text, (err, result) => {
        if (err){
            response = {
                "error": "internal server error"
            };

            return res.set({
                "Content-Type": "application/json; charset=utf-8"
            }).status(500).send(response);
        }

        response = {
            "status": result
        };

        return res.set({
            "Content-Type": "application/json; charset=utf-8"
        }).status(200).send(response);
    });
};

module.exports = {
    evaluate
};
