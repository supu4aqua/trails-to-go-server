const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Leaderboard Endpoints", function () {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe(`GET /api/leaderboards`, () => {
    it("responds with 200 and an empty list", () => {
      return supertest(app).get("/api/leaderboards").expect(200, {
        longestTrails: [],
        mostTrailsByUser: [],
        lengthByUser: [],
      });
    });
  });
});
