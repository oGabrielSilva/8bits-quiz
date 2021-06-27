const Login = require("../models/Login")

exports.index = (req, res) => {
    res.render('adm')
}

exports.login = async (req, res) => {
        try {
        const login = new Login(req.body)
        await login.enter()

        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('/system.config')
            })
            return
        }

        req.flash('success', 'Login realizado com sucesso para a classe ADM.')
        const groupAdm = await Login.findAdm()
        req.session.groupAdm = groupAdm
        req.session.adm = login.adm
        req.session.save(() => {
            return res.redirect('/system.config')
        })
        return
    } catch(e) {
        console.log(e)
        res.render('404')
    }
}

exports.out = (req, res) => {
    req.session.destroy()
    res.redirect('/')
} 

exports.create = async (req, res) => {
    try {
        const login = new Login(req.body) 
        await login.register()

        if(login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(() => {
                return res.redirect('/system.config')
            })
            return
        }

        req.flash('success', 'ADM criado com sucesso.')
        req.session.save(() => {
            return res.redirect('/system.config')
        })
        return
    } catch(e) {
        console.log(e)
        res.render('404')
    }
}
