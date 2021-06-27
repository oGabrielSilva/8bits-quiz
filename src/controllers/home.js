const Contact = require('../models/Contact')

exports.index = async (req, res) => {
    const contacts = await Contact.findContacts()
    res.render('index', { contacts })
}