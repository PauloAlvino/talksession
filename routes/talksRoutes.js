const express = require('express')
const routes = express.Router()
const TalksController = require('../controllers/TalksController')
const checkAuth = require('../helpers/auth').checkAuth

routes.get('/',TalksController.showTalks)
routes.get('/dashboard', checkAuth, TalksController.dashboard)
routes.get('/dashboard/post', checkAuth, TalksController.talkPost)
routes.post('/dashboard/post', checkAuth, TalksController.postTalks)
routes.get('/dashboard/update/:id', checkAuth, TalksController.showTalkUpdate)
routes.post('/dashboard/update/:id', checkAuth, TalksController.talkUpdate)

module.exports = routes