const Talk = require('../models/Talk')
const User = require('../models/User')

module.exports = class TalksController {
    static async showTalks(req,res) {
        res.render('talks/home')
    }
}