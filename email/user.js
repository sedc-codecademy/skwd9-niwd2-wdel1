const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ngbarak@gmail.com',
        subject: 'Thanks for joining!',
        text: `Welcome to Todo App ${name}!`
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'ngbarak@gmail.com',
        subject: 'Take care!',
        text: `Goodbye, ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail,
}