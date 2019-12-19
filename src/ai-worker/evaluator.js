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

    if (!isset(text)){
        let respone = {
            "error": "no text provided"
        };

        return res.set({
            "Content-Type": "application/json; charset=utf-8"
        }).status(400).send(respone);
    }

    let classifier = new Classifier(0.05); // Tolerance of 0.05
};

module.exports = {
    evaluate
};
