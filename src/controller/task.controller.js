const libphonenumber = require('libphonenumber-js')
const bcrypt = require('bcryptjs')
const User = require('../models/tasks.model')

const createUser = async (req, res) => {


    let {
        name,
        username,
        email,
        phone,
        profilePhoto,
        password,
        confirm
    } = req.body

    // Name:
    // -------
    // Name can not be empty
    // Name should be atleast 5 character



    if (name.length == 0)
        req.check('name', "Name Can't Empty").custom(e => false)
    else
        req.check('name', "Name should be 5 Character").isLength({
            min: 5
        })



    // User Name
    // ---------
    // User Name can't empty
    // User Name Should be unique

    let isUserExists = await User.find({
        username
    })


    if (username.length === 0)
        req.check('username', "Username Can't Empty").custom(e => false)
    if (isUserExists.length > 0)
        req.check('username', "Username Should be Unique").custom(e => false)


    // Email...
    // ----------
    // Email can't empty
    // Email should be  unique
    // vallid Email

    let isEmailExists = await User.find({
        email
    })

    if (email.length === 0)
        req.check('email', "Email Can't Empty").custom(e => false)
    else
        req.check('email', "Please provide valid email").isEmail()

    if (isEmailExists.length > 0)
        req.check('email', `Already Using this Email`).custom(e => false)

    // Phone...
    // ---------
    // Phone Number Can't Empty
    // valid Phone Number
    // Phone Number Should be unique

    // src: https://www.npmjs.com/package/libphonenumber-js
    const isValidPhoneNumber = (number) => {
        return new libphonenumber.parsePhoneNumber(number).isValid()
    }

    let isPhoneNumberExists = await User.find({
        phone
    })


    if (phone.length === 0)
        req.check('phone', "Phone Number Can't Empty").custom(e => false)
    else if (!isValidPhoneNumber(phone))
        req.check('phone', "Please Provide valid phone number").custom(e => false)
    else if (isPhoneNumberExists.length > 0)
        req.check('phone', "Already Using This Phone Number").custom(e => false)

    // Profile Photo
    // ---------------
    // Profile Photo can't Empty
    let sampleFile = req.files.profilePhoto
    sampleFile.mv('/filename.jpg', function (err) {
        if (err)
            return res.status(500).send(err);

        console.log('uploaded')
    });



    // Password....
    // -------------
    // Password & Confirm can't empty
    // Password Should  be 5 character include must be special character
    // Password match with confirm password

    if (password.length === 0)
        req.check('password', "Password Can't Empty").custom(e => false)
    else if (confirm.length === 0)
        req.check('confirm', "Confirm Password Can't Empty").custom(e => false)
    else if (password != confirm)
        req.check('password', 'Passwaord Did not Match').custom(e => false)
    else
        req.check('password', 'Password with Special Character Needed').matches(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/)


    if (req.validationErrors()) {
        res.status(422).json({
            errors: req.validationErrors()
        });
    } else {
        // Here Everything is Correct now store user to DB
        const newUser = new User({
            name,
            username,
            email,
            phone,
            password: bcrypt.hashSync(password, 10)
        })
        const user = await newUser.save()
        res.status(201).json({
            "code": 201,
            "status": "OK",
            "message": "Successfully Create User!!!",
            "data": []
        })
    }
}

const getUser = async (req, res) => {

    let user = await User.getName('Shuvro')
    console.log(user)
}



module.exports = {
    createUser,
    getUser
}