/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {


    //for registering users
    let insertUser = (details, callback) => {
        let query = "INSERT INTO users (username, passhash, age) VALUES ($1, $2, $3) RETURNING id;";
        let values = [details.username, details.passhash, details.age];
        dbPoolInstance.query(query, values, (err, queryResult) => {
            if (err) {
                callback(err, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0].id);
                } else {
                    callback(null, null);
                }
            }
        });
    };



    //for inserting into SLEEP table
    let insertSleep = (details, callback) => {
        let query = "INSERT INTO sleep (userId, sleepstart, sleepend, duration, notes) VALUES ($1, $2, $3, $4, $5) RETURNING id;";
        let values = [details.userId, details.sleepstart, details.sleepend, details.duration, details.notes]
        dbPoolInstance.query(query, values, (err, queryResult) => {
            if( err ){
                // invoke callback function with results after query has executed
                callback(err, null);
            }else{
                // invoke callback function with results after query has executed
                if( queryResult.rows.length > 0 ){
                    callback(null, queryResult.rows[0].id);
                }else{
                    callback(null, null);
                }
            }
        });
    };


    //for inserting into ACTIVITY table
    let insertAct = (details, callback) => {
        let query = "INSERT INTO activity (userId, name, start, benefit, notes) VALUES ($1, $2, $3, $4, $5) RETURNING id;"
        let values = [details.userId, details.name, details.start, details.benefit, details.notes];
        dbPoolInstance.query(query, values, (err, queryResult) => {
            if( err ){
                // invoke callback function with results after query has executed
                callback(err, null);
            }else{
                // invoke callback function with results after query has executed
                if( queryResult.rows.length > 0 ){
                    callback(null, queryResult.rows[0].id);
                }else{
                    callback(null, null);
                }
            }
        });
    };


    //selecting from SLEEP table
    let selectSleep = (details, callback) => {
        let query = "SELECT * FROM sleep " + details + "ORDER BY sleepstart ASC";
        dbPoolInstance.query(query, (err, queryResult) => {
            console.log(queryResult)
            if (err) {
                callback(err, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    //when theres no error and no result
                    callback(null, null);
                }
            };
        });
    };


    //selecting from ACTIVITY table
    let selectAct = (details, callback) => {
        let query = "SELECT * FROM activity " + details + "ORDER BY start ASC";
        dbPoolInstance.query(query, (err, queryResult) => {
            if (err) {
                callback(err, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows);
                } else {
                    //when theres no error and no result
                    callback(null, null);
                }
            };
        });
    };


    //Experimental. Not sure if this is gonna work
    //selecting from both tables
    let selectBoth = (details, callback) => {
        selectSleep(details.slp, (err1, slpResults) => {
            selectAct(details.act, (err2, actResults) => {
                if (err1 || err2) {
                    console.log("Error 1:")
                    console.log(err1)
                    console.log("Error 2:")
                    console.log(err2)
                    let err = {
                        err1,
                        err2
                    }
                    callback(err, null)
                } else {
                    if (actResults || slpResults) {
                        let results = {
                            slp: slpResults,
                            act: actResults
                        }
                        callback(null, results)
                    } else {
                        callback(null, null);
                    }
                }
            })
        })
    };




    //to retrive data about who is the current user
    let checkUser = (searchParameters, callback) => {
        let query = "SELECT * FROM users " + searchParameters;
        dbPoolInstance.query(query, (err, queryResult) => {
            if (err) {
                callback(err, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0]);
                } else {
                    //when theres no error and no result
                    callback(null, null);
                }
            }
        });
    };


    let delSleep = (slpId, callback) => {
        let query = "DELETE FROM sleep WHERE id='" + slpId + "' RETURNING id;";
        dbPoolInstance.query(query, (err, queryResult) => {
            if (err) {
                callback(err, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0].id);
                } else {
                    callback(null, null);
                }
            }
        });
    };


    let delAct = (actid, callback) => {
        let query = "DELETE FROM activity WHERE id='" + actid + "' RETURNING userid;";
        dbPoolInstance.query(query, (err, queryResult) => {
            if (err) {
                callback(err, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0].userid);
                } else {
                    callback(null, null);
                }
            }
        });
    };




    let editSleep = (details, callback) => {
        let query = "UPDATE sleep SET userid=$1, sleepstart=$2, sleepend=$3, duration=$4, notes=$5 WHERE id=$6 RETURNING userid"
        let values = [details.userid, details.start, details.end, details.duration, details.notes, details.id];
        dbPoolInstance.query(query, values, (err, queryResult) => {
            if (err) {
                callback(err, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0].id);
                } else {
                    callback(null, null);
                }
            }
        });
    };


    let editAct = (details, callback) => {
        let query = "UPDATE activity SET userid=$1, name=$2, start=$3, benefit=$4, notes=$5 WHERE id=$6 RETURNING userid"
        let values = [details.userid, details.name, details.start, details.benefit, details.notes, details.id];
        dbPoolInstance.query(query, values, (err, queryResult) => {
            if (err) {
                callback(err, null);
            } else {
                if (queryResult.rows.length > 0) {
                    callback(null, queryResult.rows[0].userid);
                } else {
                    callback(null, null);
                }
            }
        });
    };





    //test model for trying to extract data
    let test = (callback) => {
        let query = "SELECT * FROM sleep;"
        dbPoolInstance.query(query, (err, queryResult) => {
            callback(null, queryResult.rows[0]);
        });
    };



    return {
        insertUser,
        insertSleep,
        insertAct,
        selectSleep,
        selectAct,
        selectBoth,
        checkUser,
        delSleep,
        delAct,
        editSleep,
        editAct,
        test
    };
};