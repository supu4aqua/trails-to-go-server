const express = require("express");
const path = require("path");
const CompletedService = require("./completed-service");
const { requireAuth } = require("../middleware/jwt-auth");

const completedRouter = express.Router();
const jsonBodyParser = express.json();

/*Get all completed trails of a logged in user */
completedRouter.route("/").get(requireAuth, (req, res, next) => {
  CompletedService.getCompletedByUserId(req.app.get("db"), req.user.id)
    .then((completedTrails) => {
      res.json(completedTrails.map(CompletedService.serializeCompletedTrails));
    })
    .catch(next);
});

/*Insert a trail into completed table whne user marks it as completed */
completedRouter
  .route("/")
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const { trail_id, name, length } = req.body;
    const newCompletedTrail = {
      trail_id,
      name,
      length,
    };
    /*Return an error if all key values are not passed while inserting into completed table */
    for (const [key, value] of Object.entries(newCompletedTrail))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`,
        });

    newCompletedTrail.user_id = req.user.id;

    CompletedService.insertCompleted(req.app.get("db"), newCompletedTrail)
      .then((completedTrail) => {
        res
          .status(201)
          .json(CompletedService.serializeCompletedTrails(completedTrail));
      })
      .catch(next);
  });

module.exports = completedRouter;
