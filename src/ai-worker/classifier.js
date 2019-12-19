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
        callback(null, "ok");
    }

    calculateProbability(positiveMatches, positiveTotal, negativeMatches, negativeTotal){
        let unknownWordStrength = 1.0;
        let unknownWordProbability = 0.5;

        let total = positiveMatches + negativeMatches;
        let positiveRatio = positiveMatches / parseFloat(positiveTotal);
        let negativeRatio = negativeMatches / parseFloat(negativeTotal);

        let probability = positiveRatio / (positiveRatio + negativeRatio);

        return ((unknownWordStrength * unknownWordProbability) + (total * probability)) / (unknownWordStrength + total);
    }

    recordProbability(probability){
        if (isNaN(probability)) return;

        this.totalProbability = (this.totalProbability === 0) ? probability : this.totalProbability * probability;
        this.inverseTotalProbability = (this.inverseTotalProbability === 0) ? (1 - probability) : this.inverseTotalProbability * (1 - probability);
    }

    combineProbabilities(){
        if (this.totalProbability === 0) return 0.5;
        return this.totalProbability / (this.totalProbability + this.inverseTotalProbability);
    }

    evaluateEmotion(probability){
        if (probability <= (0.5 - this.tolerance)) return "negative";
        if (probability >= (0.5 + this.tolerance)) return "positive";
        return "neutral";
    }
}

module.exports = Classifier;
