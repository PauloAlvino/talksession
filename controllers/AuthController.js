const User = require("../models/User");
const bcrypt = require("bcryptjs");
module.exports = class AuthController {
  static login(req, res) {
    res.render("auth/login");
  }
  static async loginPost(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      req.flash("message", "Todos os Campos São Obrigatórios");
      res.render("auth/login");
      return;
    }
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash("message", "Usuario nao existe");
      req.session.save(() => {
        res.redirect("/login");
      });
      return;
    }
    const passwordCompared = bcrypt.compareSync(password, user.password);

    if (!passwordCompared) {
      req.flash("message", "Senha incorreta, tente novamente");
      req.session.save(() => {
        res.redirect("/login");
      });
      return;
    }
    req.session.userId = user.id;
    req.session.save(() => {
      res.redirect("/");
    });
  }
  static register(req, res) {
    res.render("auth/register");
  }
  static async postUser(req, res) {
    const emailRegex =
      /^([a-z]){1,}([a-z0-9._-]){1,}([@]){1}([a-z]){2,}([.]){1}([a-z]){2,}([.]?){1}([a-z]?){2,}$/i;
    const { name, email, password, confirm } = req.body;
    if (!name || !email || !password || !confirm) {
      req.flash("message", "Todos os Campos São Obrigatórios");
      res.render("auth/register");
      return;
    }
    if (!emailRegex.test(email)) {
      req.flash("message", "Email Inválido, Tente Novamente");
      res.render("auth/register");
      return;
    }
    if (password != confirm) {
      req.flash("message", "As Senhas Não Conferem, Tente Novamente");
      res.render("auth/register");
      return;
    }

    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      req.flash("message", "Usuário Já Existe, Tente Novamente");
      res.render("auth/register");
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      const user = await User.create({ name, email, password: hashedPassword });
      req.session.userId = user.id;
      req.flash("sucess", "Usuário Registrado Com Sucesso!");
      req.session.save(function () {
        res.redirect("/");
      });
    } catch (err) {
      console.error(err);
      res.status(500).send("Erro ao registrar usuário");
    }
  }
  static async userLogout(req, res) {
    req.session.destroy((err) => {
      console.log(err);

      if (err) {
        return res.redirect("/");
      }
      res.redirect("/login");
    });
  }
};
