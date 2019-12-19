"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

module.exports = function(res, message, status){
    res.set({
        "Content-Type": "application/json; charset=utf-8"
    }).status(status).send(message);
};
