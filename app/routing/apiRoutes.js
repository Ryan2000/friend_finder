/**
 * Created by ryanhoyda on 7/30/17.
 */
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var surveyData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function(req, res) {
        res.json(surveyData);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function(req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        console.log(req.body);
        surveyData.push(req.body); //Add the response
        console.log("--after adding data--");
        console.log(surveyData);
    });

};


function variance(array1, array2){
    var diffCounter = 0;
    for (var i = 0; i < array1.length; i++){
        var diff = array1[i] - array2[i];
        diff = Math.abs(diff);
        diffCounter += diff;
    }
    return diffCounter;
}


function findVariances(scores) {
    var results = [];

    for (var i = 0; i < surveyData.length; i++){
        var diff = variance(scores, surveyData[i].scores);
        var name = surveyData.name;
        results.push({name: name, scoreDifference: diff});
    }
    return results;
}