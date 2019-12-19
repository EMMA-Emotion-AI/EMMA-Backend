"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

let responder = require("./responder");

module.exports = function(req, res){
    responder(res, {
        "error": "route not found"
    }, 404);
};
