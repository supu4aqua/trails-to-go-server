const express = require("express");
const path = require("path");
const UsersService = require("./users-service");

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.route("/").get((req, res, next) => {
  UsersService.getAllUsers(req.app.get("db"))
    .then((users) => {
      res.json(users.map(UsersService.serializeUser));
    })
    .catch(next);
});

usersRouter.post("/", jsonBodyParser, (req, res, next) => {
  const { password, user_name, full_name } = req.body;
  const newUser = { password, user_name, full_name };

  for (const [key, value] of Object.entries(newUser))
    if (value == null)
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` },
      });

  // TODO: check user_name doesn't start with spaces

  const passwordError = UsersService.validatePassword(password);

  if (passwordError) return res.status(400).json({ error: passwordError });

  UsersService.hasUserWithUserName(req.app.get("db"), user_name)
    .then((hasUserWithUserName) => {
      if (hasUserWithUserName)
        return res.status(400).json({ error: `Username already taken` });

      return UsersService.hashPassword(password).then((hashedPassword) => {
        const newUser = {
          user_name,
          password: hashedPassword,
          full_name,
          date_created: "now()",
        };

        return UsersService.insertUser(req.app.get("db"), newUser).then(
          (user) => {
            res
              .status(201)
              .location(path.posix.join(req.originalUrl, `/${user.id}`))
              .json(UsersService.serializeUser(user));
          }
        );
      });
    })
    .catch(next);
});

module.exports = usersRouter;
