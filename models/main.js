/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {


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
        let query = "INSERT INTO activity (userId, name, start, benefit) VALUES ($1, $2, $3, $4) RETURNING id;"
        let values = [details.userId, details.name, details.start, details.benefit];
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

    }


    //selecting from ACTIVITY table
    let selectAct = (details, callback) => {

    }


    //test model for trying to extract data
    let test = (callback) => {
        let query = "SELECT * FROM sleep;"
        dbPoolInstance.query(query, (err, queryResult) => {
            callback(null, queryResult.rows[0]);
        });
    }



    return {
        insertSleep,
        insertAct,
        selectSleep,
        selectAct,
        test
    };
};