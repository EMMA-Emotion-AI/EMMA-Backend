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
// eslint-disable-next-line no-unused-vars
router.get("/", (req, res, app) => {
    res.send({ status: "ok" });
});

module.exports = router;
