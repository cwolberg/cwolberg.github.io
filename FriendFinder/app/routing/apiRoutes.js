var friends = require("../data/friends");

module.exports = function(app) {
  // Return all friends found in friends.js as JSON
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);//logs the inputs of scores

    // Receive user details (name, photo, scores)
    var user = req.body;

    // parseInt for scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // default match is first in order, but result will be whoever has the least difference
    var friendIndex = 0;
    var minimumDiff = 40; 

    // starts withzero difference and compares user and friend scores, one set at a time
    // whatever the difference is per index, add to the total difference
    for(var i = 0; i < friends.length; i++) {
      var totalDiff = 0;
      for(var o = 0; o < friends[i].scores.length; o++) {
        var difference = Math.abs(user.scores[o] - friends[i].scores[o]);
        totalDiff += difference;
      }

      // if there is a new minimum, change the friend index and set the new min for next comparisons
      if(totalDiff < minimumDiff) {
        friendIndex = i;
        minimumDiff = totalDiff;
      }
    }

    // add user to friend array
    friends.push(user);

    // send the best friend match
    res.json(friends[friendIndex]);
  });
};