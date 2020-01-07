"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

// Dependencies
let rethink = require("rethinkdb");

// Utils
let log = require("../utils/logger");
let config = require("../utils/configHandler").getConfig();

// Helper
let { getWords, countTotalEntries } = require("./helper");

rethink.connect({
    host: config.database.host,
    port: config.database.port,
    db: config.database.db,
    user: config.database.user,
    password: config.database.password
}).then(() => log.done("Connected to RethinkDB!"));

/**
 * Retrives data from a specific table
 *
 * @param {string} table
 * @returns {string} data
 */
let retriveFromDb = function(table){
    return String(rethink.table(table).getAll());
};

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
    constructor(){
        this.tokens = {};
        this.totalTokens = 0;
    }

    add(document){
        document.eachWord((word) => (this.tokens[word] = (this.tokens[word] || 0) + 1));
    }

    async loadFromDatabase(tone){
        let data = null;
        switch(tone.toLowerCase()){
            case "positive": {
                data = await retriveFromDb(config.database.positive_table);
                break;
            }
            case "negative": {
                data = await retriveFromDb(config.database.negative_table);
                break;
            }
            default: {
                log.error("Invalid coprus option provided! Shutting down...");
                process.exit(1);
            }
        }

        data.split("\n").forEach(line => this.add(new Document(line)));
        this.totalTokens = countTotalEntries(this.tokens);
    }

    tokenCount(word){
        return this.tokens[word] || 0;
    }
}

module.exports = { Corpus, Document };
