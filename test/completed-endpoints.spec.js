const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Completed Endpoints", function () {
  let db;

  const { testUsers, testCompleted } = helpers.makeTrailsFixtures();

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

  const testUser = testUsers[0];

  describe(`GET /api/completed`, () => {
    context("Given there are completed trails in the database", () => {
      const { testCompleted } = helpers.makeTrailsFixtures();
      beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

      beforeEach("insert completed", () => {
        return db.into("completed").insert(testCompleted);
      });

      it("responds with 200 and all of the completed trails", () => {
        return supertest(app)
          .get("/api/completed")
          .set("Authorization", helpers.makeAuthHeader(testUser))
          .expect(200, [
            {
              trail_id: 705161,
              name: "Clairveille",
              length: "12.15",
            },
            {
              trail_id: 705162,
              name: "Clairveille Conservation",
              length: "12.15",
            },
            {
              trail_id: 705163,
              name: "Clairveille Conservation Park",
              length: "12.15",
            },
          ]);
      });
    });
  });
});
