const mongoose = require('mongoose')
const validator = require('validator')

const FeedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false },
    email: { type: String, required: true },
    motive: { type: String, required: true },
    description: { type: String, required: false },
    date: { type: Date, default: Date.now }
})

const FeedbackModel = mongoose.model('Feedback', FeedbackSchema)

class Feedback {
    constructor(body) {
        this.body = body
        this.errors = []
        this.feedback = null
    }

    async send() {
        this.valid()
        if(this.errors.length > 0) return

        this.feedback = await FeedbackModel.create(this.body)
    }

    valid() {
        this.cleanUp()

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')

        if(this.body.motive.length < 1) {
            this.errors.push('Você precisa enviar um título')
        }

        if(this.body.name.length < 1) {
            this.errors.push('Você precisa enviar pelo menos o seu primeiro nome')
        }
    }

    cleanUp() {
        for(let key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            email: this.body.email,
            name: this.body.name,
            surname: this.body.surname,
            motive: this.body.motive,
            description: this.body.description
        }
    }
}

module.exports = Feedback;