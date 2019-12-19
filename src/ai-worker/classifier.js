"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

class Classifier {
    constructor(tolerance = 0.05){
        this.tolerance = tolerance;

        this.totalProbability = 0;
        this.inverseTotalProbability = 0;
    }

    classify(text, callback){
        // TODO: Everything
    }
}

module.exports = Classifier;
