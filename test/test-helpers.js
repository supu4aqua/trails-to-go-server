const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: "test-user-1",
      full_name: "Test user 1",
      password: "password",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 2,
      user_name: "test-user-2",
      full_name: "Test user 2",
      password: "password",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 3,
      user_name: "test-user-3",
      full_name: "Test user 3",
      password: "password",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
    {
      id: 4,
      user_name: "test-user-4",
      full_name: "Test user 4",
      password: "password",
      date_created: new Date("2029-01-22T16:28:32.615Z"),
    },
  ];
}

function makeCompletedArray(users) {
  return [
    {
      trail_id: 705161,
      user_id: 1,
      name: "Clairveille",
      length: 12.15,
    },
    {
      trail_id: 705162,
      user_id: 1,
      name: "Clairveille Conservation",
      length: 12.15,
    },
    {
      trail_id: 705163,
      user_id: 1,
      name: "Clairveille Conservation Park",
      length: 12.15,
    },
  ];
}

function makeTrailsFixtures() {
  const testUsers = makeUsersArray();
  const testCompleted = makeCompletedArray(testUsers);
  return { testUsers, testCompleted };
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
        users,
        completed
      `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE completed_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('users_id_seq', 0)`),
          trx.raw(`SELECT setval('completed_id_seq', 0)`),
        ])
      )
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));
  return db
    .into("users")
    .insert(preppedUsers)
    .then(() =>
      // update the auto sequence to stay in sync
      db.raw(`SELECT setval('users_id_seq', ?)`, [users[users.length - 1].id])
    );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeCompletedArray,
  makeTrailsFixtures,
  cleanTables,
  makeAuthHeader,
  seedUsers,
};
