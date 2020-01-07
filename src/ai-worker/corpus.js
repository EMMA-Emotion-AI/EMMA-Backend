"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

// Utils
let log = require("../utils/logger");

// Helper
let { getWords, countTotalEntries } = require("./helper");

/**
 * Iterator function for the documents
 *
 * @class Document
 */
class Document {
    constructor(content){
        this.words = getWords(content);
    }

    eachWord(callback){
        this.words.map(callback);
    }
}

/**
 * Main class to load entries from the Database
 *
 * @class Corpus
 */
class Corpus {
    constructor(database){
        this.tokens = {};
        this.totalTokens = 0;
        this.database = database;
    }

    add(document){
        document.eachWord((word) => (this.tokens[word] = (this.tokens[word] || 0) + 1));
    }

    async loadFromDatabase(table){
        await this.database.table(table)
            .run()
            .then(response => {
                response.map(e => e.text).forEach(line => this.add(new Document(line)));
                this.totalTokens = countTotalEntries(this.tokens);
            })
            .error(log.error);
    }

    tokenCount(word){
        return this.tokens[word] || 0;
    }
}

module.exports = { Corpus, Document };
