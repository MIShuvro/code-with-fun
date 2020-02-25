const sgMail = require('@sendgrid/mail')

sgMail.setApiKey('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')
const sendMailTest = (email, user) => {

    sgMail.send({
        to: email,
        from: "Error Ltd. <noreply@error.com>",
        subject: 'Welcome To Error Software Ltd.',
        html: `<div style="
                    border: 2px solid #333;
                    width: 300px;
                    padding: 45px;
                    font-size: 16px;
                    font-family: Arial;
                    
                ">
                    <h2>Activate your Account</h2>
                    <p>Hi, ${user.username}</p>
                    <p>Thanks for creatting account on our site. Now before login to your account, please activate it</p>
                    <a href="${
                        process.env.APP_URL
                    }/auth/activateAccount?token=${
                user.activationToken
            }">Activate</a>
                    
                </div>
        `
    })

}
module.exports = {
    sendMailTest
}