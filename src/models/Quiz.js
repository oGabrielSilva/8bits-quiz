const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({
    date: { type: String, required: true },
    placing: { type: Number, min: 0, max: 100 },
    title: { type: String, required: true },
    class: { type: String, required: true },
    quest1: { type: String, required: true },
    right1: { type: String, required: true },
    fake1: { type: String, required: true },
    quest2: { type: String, required: true },
    right2: { type: String, required: true },
    fake2: { type: String, required: true },
    quest3: { type: String, required: true },
    right3: { type: String, required: true },
    fake3: { type: String, required: true },
    quest4: { type: String, required: true },
    right4: { type: String, required: true },
    fake4: { type: String, required: true },
    quest5: { type: String, required: true },
    right5: { type: String, required: true },
    fake5: { type: String, required: true },
    quest6: { type: String, required: false },
    right6: { type: String, required: false },
    fake6: { type: String, required: false },
    quest7: { type: String, required: false },
    right7: { type: String, required: false },
    fake7: { type: String, required: false },
    quest8: { type: String, required: false },
    right8: { type: String, required: false },
    fake8: { type: String, required: false },
    quest9: { type: String, required: false },
    right9: { type: String, required: false },
    fake9: { type: String, required: false },
    quest10: { type: String, required: false },
    right10: { type: String, required: false },
    fake10: { type: String, required: false }
})

const QuizModel = mongoose.model('Quiz', QuizSchema)

class Quiz {
    constructor(body) {
        this.body = body
        this.warns = []
        this.quiz = null
    }

    async register() {
        this.valid()

        if (this.warns.length > 0) {
            this.warns.push('Alguns campos foram excluídos. Revise o quiz.')
        }

        this.quiz = await QuizModel.create(this.body)
    }

    valid() {
        this.cleanUp()

        for (let key in this.body) {
            if (this.body[key].length < 1) {
                this.warns.push(`O campo ${key} foi exluído.`)
                delete this.body[key]
            }
        }
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string' || this.body[key].length > 150) {
                this.body[key] = ''
            }
        }

        const aux = {}
        for (let key in this.body) {
            aux[key] = this.body[key]
        }

        this.body = null
        this.body = { ...aux }
        this.body.date = new Date().toLocaleString('pt-br')
        this.body.placing = 0
    }

    static async removeById(id) {
        const quiz = await QuizModel.findByIdAndDelete(id.id)
        return quiz
    }
}

module.exports = Quiz
