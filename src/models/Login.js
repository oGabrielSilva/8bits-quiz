const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs') 

const LoginSchema = new mongoose.Schema({
    username: { type: String, required: false },
    name: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
    constructor(body) {
        this.body = body
        this.errors = []
        this.adm = null
    }

    async enter() {
        this.valid()
        if(this.errors.length > 0) return;
        this.adm = await LoginModel.findOne({ email: this.body.email })
        if(!this.adm) {
            this.errors.push('Usuário ou senha incorretos.')
            return
        }
        if(!bcryptjs.compareSync(this.body.password, this.adm.password)) {
            this.errors.push('Usuário ou senha incorretos.')
            this.adm = null
            return
        }
    }

    async register() {
        this.valid()
        if(this.errors.length > 0) return;
        
        await this.admExists()

        if(this.errors.length > 0) return;
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        
        this.adm = await LoginModel.create(this.body)
    }

    async admExists() {
        this.adm = await LoginModel.findOne({ email: this.body.email })
        if(this.adm) this.errors.push('E-mail já cadastrado em nosso banco de dados.')
    }

    valid() {
        this.cleanUp()

        if(!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')

        if(this.body.password.length < 8 || this.body.password.length > 50) {
            this.errors.push('A senha precisa ter entre 8 e 50 caracteres.')
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
            password: this.body.password,
            description: this.body.description,
            username: this.body.username,
            name: this.body.name
        }
    }

    static async findAdm() {
        const adm = await LoginModel.find()
        return adm
    }
}

module.exports = Login;
