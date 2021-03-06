const bcrypt = require("bcryptjs");
const xss = require("xss");

const CompletedService = {
  /*Find a completed trails for user where user_id is id */
  getCompletedByUserId(db, id) {
    return db
      .from("completed")
      .select("trail_id", "name", "length")
      .where("user_id", id);
  },

  /*insert data into completed table */
  insertCompleted(db, newCompletedTrail) {
    return db
      .insert(newCompletedTrail)
      .into("completed")
      .returning("*")
      .then(([completedTrail]) => completedTrail)
      .then((completedTrail) =>
        CompletedService.getCompletedByUserId(db, completedTrail.id)
      );
  },

  serializeCompletedTrails(completedTrail) {
    return {
      id: completedTrail.id,
      user_id: completedTrail.user_id,
      trail_id: completedTrail.trail_id,
      name: xss(completedTrail.name),
      length: completedTrail.length,
      completed_on: new Date(completedTrail.completed_on).toDateString,
    };
  },
};

module.exports = CompletedService;
