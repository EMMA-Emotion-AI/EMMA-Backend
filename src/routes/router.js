"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

// Dependendies
let express = require("express");

// Services
let err404Handler = require("../services/err404Handler");

// Init router
// eslint-disable-next-line new-cap
let router = express.Router();

// Routes
router.get("/",      require("../ai-worker/evaluator").evaluate);
router.get("/stats", require("./route/stats"));

// 404
router.get("*", err404Handler);

module.exports = router;
