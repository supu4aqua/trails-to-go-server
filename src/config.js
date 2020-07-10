module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL || "postgresql://trail_admin@localhost/trails",
  TEST_DATABASE_URLL:
    process.env.TEST_DATABASE_URL ||
    "postgresql://trail_admin@localhost/trails_test",
  JWT_SECRET: process.env.JWT_SECRET || "change-this-secret",
  JWT_EXPIRY: process.env.JWT_EXPIRY || "3h",
};
