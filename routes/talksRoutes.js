const express = require('express')
const routes = express.Router()
const TalksController = require('../controllers/TalksController')

routes.get('/',TalksController.showTalks)

module.exports = routes