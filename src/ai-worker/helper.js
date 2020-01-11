"use strict";

// ====================== //
// = Copyright (c) EMMA = //
// ====================== //

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
        // Englisch //
        "a,able,about,across,after,all,almost,also,am,among,an,and,any,are,as,at," +    /* a */
        "be,because,been,but,by," +                                                     /* b */
        "can,cannot,could," +                                                           /* c */
        "dear,did,do,does," +                                                           /* d */
        "either,else,ever,every," +                                                     /* e */
        "for,from," +                                                                   /* f */
        "get,got," +                                                                    /* g */
        "had,has,have,he,her,hers,him,his,how,however," +                               /* h */
        "i,if,in,into,is,it,its," +                                                     /* i */
        "just," +                                                                       /* j */
        "keep," +                                                                       /* k */
        "least,let,like,likely," +                                                      /* l */
        "may,me,might,most,must,my," +                                                  /* m */
        "neither,no,nor,not," +                                                         /* n */
        "of,off,often,on,only,or,other,our,own," +                                      /* o */
        "probably," +                                                                   /* p */
        "quick," +                                                                      /* q */
        "rather,really," +                                                              /* r */
        "said,say,says,she,should,since,so,some," +                                     /* s */
        "than,that,the,their,them,then,there,these,they,this,tis,to,too,totally," +     /* t */
        "us," +                                                                         /* u */
        "view," +                                                                       /* v */
        "wants,was,we,were,what,when,where,which,while,who,whom,why,will,with,would," + /* w */
        "" +                                                                            /* x */
        "yet,you,your,yourself," +                                                      /* y */
        "zero," +                                                                       /* z */

        // German //
        "aber,alle,als,also,am,an,andere,auch,auf," +                                   /* a */
        "bin,bis,bist," +                                                               /* b */
        "ca.,ca," +                                                                     /* c */
        "da,damit,dann,das,deinem,dem,den,denn,der,dessen,dich,die,doch,dort,du," +     /* d */
        "ein,eine,er,es,euch,eurer,eures," +                                            /* e */
        "für," +                                                                        /* f */
        "gegen,hab,habe," +                                                             /* g */
        "hin,hinter," +                                                                 /* h */
        "ich,ihm,ihn,in,ist," +                                                         /* i */
        "jede,jenes,jetzt," +                                                           /* j */
        "kann,kein," +                                                                  /* k */
        "" +                                                                            /* l */
        "man,manche,mit,musste," +                                                      /* m */
        "nach,nicht,nichts,noch,nun,nur," +                                             /* n */
        "ob,oder,ohne," +                                                               /* o */
        "per,plötzlich," +                                                              /* p */
        "quasi," +                                                                      /* q */
        "reagiere,reagieren,reagiert,reagierte,recht,rechts,regelmäßig,reichlich," +    /* r */
        "sehr,sein,selbst,so,solche,soll,sonst," +                                      /* s */
        "tatsaechlichen,tatsaechlicher,tatsaechliches,tausend,teile,teilen,teilte," +   /* t */
        "um,und,unter," +                                                               /* u */
        "viel,von," +                                                                   /* v */
        "war,warst,was,weg,weil,weiter,welches,wenn,werden,wie,wieder,will,wir,wird," + /* w */
        "" +                                                                            /* x */
        "" +                                                                            /* y */
        "zu,zum,zur,zwar"                                                               /* z */
    ).split(",");
};

module.exports = {
    getWords,
    countTotalEntries,
    getStopwords
};
