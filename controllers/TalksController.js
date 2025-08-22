const { where } = require("sequelize");
const Talk = require("../models/Talk");
const User = require("../models/User");

module.exports = class TalksController {
  static async showTalks(req, res) {
    const userId = req.session.userId;
    const allTalksData = await Talk.findAll({ include: User });
    const allTalks = allTalksData.map((t) => {
      const talk = t.get({plain: true});
      talk.isOwner = userId === talk.UserId;
      return talk
    })
    res.render("talks/home", { allTalks: allTalks });
  }
  static async dashboard(req, res) {
    const userTalks = await Talk.findAll({
      raw: true,
      where: { UserId: req.session.userId },
    });
    res.render("talks/dashboard", { userTalks });
  }
  static async talkPost(req, res) {
    res.render("talks/talkForm");
  }
  static async postTalks(req, res) {
    const talk = {
      title: req.body.title,
      description: req.body.description,
      UserId: req.session.userId,
    };
    await Talk.create(talk);
    req.flash("sucess", "Comentario adicionado com sucesso");
    req.session.save(() => {
      res.redirect("/talks/dashboard");
    });
  }
  static async showTalkUpdate(req, res) {
    const id = req.params.id;
    const talkSelected = await Talk.findOne({ raw: true, where: { id: id } });
    res.render("talks/update", { talkSelected: talkSelected });
  }
  static async talkUpdate(req, res) {
    const id = req.params.id;
    const talk = {
      title: req.body.title,
      description: req.body.description,
    };
    await Talk.update(talk, {where: {id: id}});
    res.redirect('/talks/dashboard')
  }
  static async deleteTalk(req,res) {
    const id = req.params.id;
    try {
      await Talk.destroy({where: {id: id}});
      req.flash('sucess', 'Comentario apagado com sucesso')
      req.session.save(() => {
        res.redirect('/')
      })
    }catch(err) {
      console.log(err);
      
    }

  }
};
