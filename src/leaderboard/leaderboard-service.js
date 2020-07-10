const bcrypt = require("bcryptjs");
const xss = require("xss");

const LeaderboardService = {
  //Get all trails completed - sort by length desc
  getLongestTrails(db) {
    return db
      .from("completed")
      .select("name", "length")
      .distinctOn("name", "length")
      .groupBy("length", "id")
      .orderBy("length", "desc")
      .limit(10);
  },
  //Most trails by user_id
  getMostTrailsByUser(db) {
    return db
      .from("completed")
      .select("users.user_name", db.raw(`count(completed.name) AS completed`))
      .leftJoin("users", "completed.user_id", "users.id")
      .groupBy("users.user_name")
      .orderBy("completed", "desc")
      .limit(10);
  },
  //Total length by user
  getLengthByUser(db) {
    return db
      .from("completed")
      .select("users.user_name", db.raw(`sum(completed.length) AS length`))
      .leftJoin("users", "completed.user_id", "users.id")
      .groupBy("users.user_name")
      .orderBy("length", "desc")
      .limit(10);
  },

  serializeTrails(completedTrail) {
    return {
      id: completedTrail.id,
      user_id: completedTrail.user_id,
      trail_id: completedTrail.trail_id,
      name: xss(completedTrail.name),
      length: completedTrail.length,
    };
  },
};

module.exports = LeaderboardService;
