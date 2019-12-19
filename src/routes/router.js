"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

// Dependendies
let express = require("express");

// Init router
// eslint-disable-next-line new-cap
let router = express.Router();

// Routes
router.get("/",      require("../ai-worker/evaluator").evaluate);
router.get("/stats", require("./route/stats"));

module.exports = router;
