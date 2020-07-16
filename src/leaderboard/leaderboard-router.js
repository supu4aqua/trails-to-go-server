const express = require("express");
const path = require("path");
const LeaderboardService = require("./leaderboard-service");

const leaderboardRouter = express.Router();
const jsonBodyParser = express.json();

leaderboardRouter.route("/").get((req, res, next) => {
  /*Get longest trail completed by each user sorted by trail length*/
  LeaderboardService.getLongestTrails(req.app.get("db"))
    .then((longestTrails) => {
      /*Get the count of trails completed by each user sorted by highest to lowest */
      LeaderboardService.getMostTrailsByUser(req.app.get("db")).then(
        (mostTrailsByUser) => {
          /*Get total distance walked by each user, counting the length of all the trails completed the a user*/
          LeaderboardService.getLengthByUser(req.app.get("db")).then(
            (lengthByUser) => {
              res.json({ longestTrails, mostTrailsByUser, lengthByUser });
            }
          );
        }
      );
    })
    .catch(next);
});

module.exports = leaderboardRouter;
