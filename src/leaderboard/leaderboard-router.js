const express = require("express");
const path = require("path");
const LeaderboardService = require("./leaderboard-service");

const leaderboardRouter = express.Router();
const jsonBodyParser = express.json();

leaderboardRouter.route("/").get((req, res, next) => {
  LeaderboardService.getLongestTrails(req.app.get("db"))
    .then((longestTrails) => {
      LeaderboardService.getMostTrailsByUser(req.app.get("db")).then(
        (mostTrailsByUser) => {
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
