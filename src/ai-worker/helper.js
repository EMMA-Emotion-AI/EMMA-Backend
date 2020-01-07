"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let getWords = function(input){
    let filtered = input.toString().replace(/[^0-9a-zA-Z ]/g, "");
    let words = filtered.split(" ").map(word => word.trim().toLowerCase());
    return words.filter(word => word.length > 0);
};

let countTotalEntries = function(tokens){
    let total = 0;
    Object.keys(tokens).forEach(word => (total += tokens[word]));
    return total;
};

let getStopwords = function(){
    return (
        "a,able,about,across,after,all,almost,also,am,among,an,and,any,are,as,at," +     /* a */
        "be,because,been,but,by," +                                                      /* b */
        "can,cannot,could," +                                                            /* c */
        "dear,did,do,does," +                                                            /* d */
        "either,else,ever,every," +                                                      /* e */
        "for,from," +                                                                    /* f */
        "get,got," +                                                                     /* g */
        "had,has,have,he,her,hers,him,his,how,however," +                                /* h */
        "i,if,in,into,is,it,its," +                                                      /* i */
        "just," +                                                                        /* j */
        "keep," +                                                                        /* k */
        "least,let,like,likely," +                                                       /* l */
        "may,me,might,most,must,my," +                                                   /* m */
        "neither,no,nor,not," +                                                          /* n */
        "of,off,often,on,only,or,other,our,own," +                                       /* o */
        "probably," +                                                                    /* p */
        "quick," +                                                                       /* q */
        "rather,really," +                                                               /* r */
        "said,say,says,she,should,since,so,some," +                                      /* s */
        "than,that,the,their,them,then,there,these,they,this,tis,to,too,totally," +      /* t */
        "us," +                                                                          /* u */
        "view," +                                                                        /* v */
        "wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would," +  /* w */
        "" +                                                                             /* x */
        "yet,you,your,yourself," +                                                       /* y */
        "zero"                                                                           /* z */
    ).split(",");
};

module.exports = {
    getWords,
    countTotalEntries,
    getStopwords
};
