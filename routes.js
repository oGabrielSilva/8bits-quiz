const express = require('express')
const route = express.Router()
const home = require('./src/controllers/home')
const rank = require('./src/controllers/rank')
const explore = require('./src/controllers/explore')
const adm = require('./src/controllers/adm')
// const login = require('./src/controllers/login')
// const contact = require('./src/controllers/contact')

// const { loginRequired } = require('./src/middlewares/global')

//adm
route.get('/system.config', adm.index)
route.get('/system.config/out', adm.out)
route.post('/system.config.login', adm.login)
route.post('/system.config.create.adm', adm.create)

//rotas da home
route.get('/', home.index)

//explore
route.get('/explore', explore.index)

//rank
route.get('/rank', rank.index)

//rotas do login
// route.get('/login', login.index)
// route.post('/login/register', login.register)
// route.post('/login/enter', login.enter)
// route.get('/login/out', login.out)

// //rotas internas 
// route.get('/contato', loginRequired, contact.contact)
// route.post('/contato/cadastro', loginRequired, contact.sendContact)
// route.get('/contato/:id', loginRequired, contact.editIndex)
// route.post('/contato/edite/:id', loginRequired, contact.edit)
// route.get('/contato/delete/:id', loginRequired, contact.del)


module.exports = route
