const express = require("express");
const routes = express.Router();
const AuthController = require("../controllers/AuthController");
routes.get("/login", AuthController.login);
routes.post("/login", AuthController.loginPost);
routes.get("/register", AuthController.register);
routes.post("/post/user", AuthController.postUser);
routes.get("/logout", AuthController.userLogout);
module.exports = routes;
