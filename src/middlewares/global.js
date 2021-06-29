exports.middlewareGlobal = (req, res, next) => {
    res.locals.errors = req.flash('errors')
    res.locals.success = req.flash('success')
    res.locals.adm = req.session.adm
    res.locals.groupAdm = req.session.groupAdm
    res.locals.feedbacks = req.session.feedbacks
    next()
}

exports.checkCsrfError = (err, req, res, next) => {
    if(err) {
        console.log('erro no csrf')
        return res.render('404')
    }
    next()
}

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

exports.loginRequired = (req, res, next) => {
    if(!req.session.adm) {
        req.flash('errors', 'Você precisa fazer login')
        req.session.save(() => res.redirect('/'))
        return
    }
    next()
}
