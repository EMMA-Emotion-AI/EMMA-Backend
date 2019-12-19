"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

let prettify = (arr) => JSON.stringify(JSON.parse(JSON.stringify(arr)), null, 4);

let evaluate = function(req, res, app){
    let text = req.query.text;

};

module.exports = {
    evaluate
};
