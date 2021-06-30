const Feedback = require('../models/Feedback')

exports.index = (req, res) => {
    res.render('./pages/claims')
}

exports.send = async (req, res) => {
    try {
        const feedback = new Feedback(req.body)
        await feedback.send()

        if(feedback.errors.length > 0) {
            req.flash('errors', feedback.errors)
            req.session.save(() => {
                return res.redirect('/reclame')
            })
            return
        }

        req.flash('success', 'Seu feedback foi enviado com sucesso.')
        req.session.save(() => {
            return res.redirect('/reclame')
        })
        return
    } catch(e) {
        console.log(e)
        res.render('404')
    }
}

exports.removeClaims = async (req, res) => {
    try {
        const date = await Feedback.findAndRemoveFeedback(req.body)
        const feedbacks = await Feedback.findFeedback()
        req.session.feedbacks = feedbacks

        req.flash('success', 'Feedback removido com sucesso')
        req.session.save(() => {
            return res.redirect('/system.config')
        })
        return
    } catch(e) {
        console.log(e)
        res.render('404')
    }
}
