"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

module.exports = function(req, res){
    let respone = {
        "error": "route not found"
    };

    res.set({
        "Content-Type": "application/json; charset=utf-8"
    }).status(404).send(respone);
};
