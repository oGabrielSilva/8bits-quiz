const mongoose = require('mongoose')
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: false, default: '' },
    email: { type: String, required: false, default: '' },
    number: { type: String, required: false, default: '' },
    date: { type: Date, default: Date.now },
})

const ContactModel = mongoose.model('Contact', ContactSchema)

class Contact {
    constructor(body) {
        this.body = body;
        this.errors = []
        this.contact = null
    }

    async register() {
        this.valid()

        if(this.errors.length > 0) return;
        this.contact = await ContactModel.create(this.body)
    }

    valid() {
        this.cleanUp() 


        if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.')
        if(!this.body.name) this.errors.push('Nome é um campo obrigatório.')
        if(!this.body.email && !this.body.number) this.errors.push('Pelo menos um contato deve ser enviado.')
    }

    cleanUp() {
        for(let key in this.body) {
            if(typeof this.body[key] !== 'string') {
                this.body[key] = ''
            }
        }

        this.body = {
            name: this.body.name,
            surname: this.body.surname,
            email: this.body.email,
            number: this.body.number,
        }
    }

    async edit(id) {
        if(typeof id !== 'string') return
        this.valid()
        if(this.errors.length > 0) return;
        this.contact = await ContactModel.findByIdAndUpdate(id, this.body, { new: true })
    }

    static async findId(id) {
        if(typeof id !== 'string') return
        const user = await ContactModel.findById(id)
        return user
    }

    static async findContacts() {
        const contacts = await ContactModel.find()
            .sort({ date: -1 })
        return contacts;
    }

    static async delete(id) {
        if(typeof id !== 'string') return
        const contact = await ContactModel.findByIdAndDelete(id)
        return contact
    }
}

module.exports = Contact;
