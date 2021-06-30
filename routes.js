const express = require('express')
const route = express.Router()
const home = require('./src/controllers/home')
const rank = require('./src/controllers/rank')
const explore = require('./src/controllers/explore')
const adm = require('./src/controllers/adm')
const claims = require('./src/controllers/claims')

const { loginRequired } = require('./src/middlewares/global')

//adm
route.get('/system.config', adm.index)
route.get('/system.config/out', adm.out)
route.post('/system.config.login', adm.login)
route.post('/system.config.create.adm', loginRequired, adm.create)
route.post('/system.config.create.quiz', loginRequired, adm.createQuiz)
route.post('/system.config.remove.quiz', loginRequired, adm.removeQuiz)
route.post('/system.config/remove.claims', loginRequired, claims.removeClaims)

//rotas da home
route.get('/', home.index)

//explore
route.get('/explore', explore.index)

//rank
route.get('/rank', rank.index)

//reclamações
route.get('/reclame', claims.index)
route.post('/reclame/send', claims.send)

module.exports = route
