/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {


    //for inserting into SLEEP table
    let insertSleep = (details, callback) => {
        let query = "INSERT INTO sleep (userId, sleepDate, start, wake, duration, notes) VALUES ($1, $2, $3, $4, $5, $6);";
        let values = [details.userId, details.sleepDate, details.start, details.wake, details.duration, details.notes]
        dbPoolInstance.query(query, values, (err, queryResult) => {
            if( err ){
                // invoke callback function with results after query has executed
                callback(err, null);
            }else{
                // invoke callback function with results after query has executed
                if( queryResult.rows.length > 0 ){
                    /*console.log("Result.rows :", queryResult.rows)*/
                    callback(null, queryResult.rows[0]);
                }else{
                    callback(null, null);
                }
            }
        });
    };


    //for inserting into ACTIVITY table
    let insertAct = (details, callback) => {
        let query = "INSERT INTO activity (userId, actDate, name, start, benefit, duration) VALUES ($1, $2, $3, $4, $5, $6);"
        let values = [details.userId, details.actDate, details.name, details.start, details.benefit, details.duration];
        dbPoolInstance.query(query, values, (err, queryResult) => {
            if( err ){
                // invoke callback function with results after query has executed
                callback(err, null);
            }else{
                // invoke callback function with results after query has executed
                if( queryResult.rows.length > 0 ){
                    /*console.log("Result.rows :", queryResult.rows)*/
                    callback(null, queryResult.rows[0]);
                }else{
                    callback(null, null);
                }
            }
        });
    };


    //selecting from SLEEP table
    let selectSleep = (details, callback) => {

    }


    //selecting from ACTIVITY table
    let selectAct = (details, callback) => {

    }



    return {
        insertSleep,
        insertAct,
        selectSleep,
        selectAct
    };
};