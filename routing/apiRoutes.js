var path = require('path');
var friends = require("../app/data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  //A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
  app.get("/api/friends", function(req, res) {
       console.log(friends)
       return res.json(friends);
  });
  // ---------------------------------------------------------------------------
  //A POST routes /api/friends. This will be used to handle incoming survey results. 
  //This route will also be used to handle the compatibility logic.
 
  app.post("/api/friends", function(req, res) {
   
      var userData = req.body;
      var matchScore = 0;
      var bestMatchScore = 50; //a number larger than the max possible difference (10 for all 1s, 50 for all 5s )
      var bestMatchScoreIndex = -1; //array index in friends of the best match - just had to be lower than zero
      for(var i = 0; i < friends.length; i++) {
        userData2 = friends[i]; //get the next person in the list of friends

     var matchScore = 0;
         for(var j = 0; j < 10; j++) { //used a different variable than i so I wouldn't get confused
          matchScore = matchScore + Math.abs(userData.scores[j] - userData2.scores[j]); //takes the absolute value of the difference in each user's score
        }

        //we found a better match than the best known match
       if(matchScore < bestMatchScore) {
        bestMatchScore = matchScore;
          bestMatchScoreIndex = i;
       }
       }

      //once we get here, the best match score is in bestMatchScore, and bestMatchScoreIndex 
      //contains where that person is in the friends array
      console.log("The best match score is " + bestMatchScore);
      console.log("The best match is " + JSON.stringify(friends[bestMatchScoreIndex]));

      console.log("name and score", userData.name, userData.scores[0]);
    
      console.log("This should be the user's data" + JSON.stringify(userData)); 
    
      friends.push(userData);  
    
      res.json({status: 'OK', matchName: friends.name, matchImage: friends.image});
  });
  // ---------------------------------------------------------------------------
  //  below code so you could clear out the table while working with the functionality.
  
  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];
    waitListData = [];

    console.log(friendData);
  
  });
};