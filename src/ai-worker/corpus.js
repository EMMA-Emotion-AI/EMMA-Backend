"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

// Utils
let log = require("../utils/logger");
let config = require("../utils/configHandler").getConfig();

// Helper
let { getWords, countTotalEntries } = require("./helper");

// Dependencies
let rethink = require("rethinkdbdash")({
    host: config.database.host,
    port: config.database.port,
    db: config.database.db,
    user: config.database.user,
    password: config.database.password
});

/**
 *  Retrives data from a specific table
 *
 * @param {*} table
 * @param {*} callback
 */
let retriveFromDb = function(table, callback){
    rethink.table(table)
        .run()
        .then(response => callback(response.map(e => e.text)))
        .error(log.error);
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

    loadFromDatabase(tone){
        switch(tone.toLowerCase()){
            case "positive": {
                log.info("Building positive corpus");
                retriveFromDb(config.database.positive_table, data => {
                    data.forEach(line => this.add(new Document(line)));
                    this.totalTokens = countTotalEntries(this.tokens);
                });
                break;
            }
            case "negative": {
                log.info("Building negative corpus");
                retriveFromDb(config.database.negative_table, data => {
                    data.forEach(line => this.add(new Document(line)));
                    this.totalTokens = countTotalEntries(this.tokens);
                });
                break;
            }
            default: {
                log.error("Invalid coprus option provided! Shutting down...");
                process.exit(1);
            }
        }
    }

    tokenCount(word){
        return this.tokens[word] || 0;
    }
}

module.exports = { Corpus, Document };
