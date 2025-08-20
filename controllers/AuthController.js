const User = require("../models/User");

module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }
  static register(req, res) {
    res.render("auth/register");
  }
  static async postUser(req, res) {
    const { name, email, password } = req.body;

    try {
      await User.create({ name, email, password });

      res.redirect("/login");
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao registrar usuário");
    }
  }
};
