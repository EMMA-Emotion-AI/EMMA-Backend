"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

// Corpus
let { Corpus, Document } = require("./corpus");

// Helper
let { getStopwords } = require("./helper");

class Classifier {
    constructor(tolerance = 0.05){
        this.tolerance = tolerance;

        this.totalProbability = 0;
        this.inverseTotalProbability = 0;

        this.positiveCorpus = new Corpus();
        this.negativeCorpus = new Corpus();

        this.positiveCorpus.loadFromDatabase("positive");
        this.negativeCorpus.loadFromDatabase("negative");
    }

    classify(text, callback){
        let stopWords = getStopwords();

        new Document(text).eachWord(word => {
            if (stopWords.includes(word)) return;

            let positiveMatches = this.positiveCorpus.tokenCount(word);
            let negativeMatches = this.negativeCorpus.tokenCount(word);

            let probability = this.calculateProbability(positiveMatches, this.positiveCorpus.totalTokens, negativeMatches, this.negativeCorpus.totalTokens);
            this.recordProbability(probability);
        });

        let combinedProbability = this.combineProbabilities();
        let probabilityPercentage = Math.round(((combinedProbability * 100) * 100) / 100) + "%";
        let emotionTone = this.evaluateEmotion(combinedProbability);

        callback(null, {
            error: 0,
            emotion_tone: emotionTone,
            emotion_value: combinedProbability,
            emotion_percentage: probabilityPercentage
        });
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
