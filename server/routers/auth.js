const router = require('express').Router()

const User = require('../Models/User')

const bcrypt = require('bcrypt')

//Register
router.post('/register', async (req,res) => {
    const {email, password, username} = req.body
    
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new User({username, email, password: hashedPassword})

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})
//Login
router.post('/login', async(req,res) => {
    try {
        const user = await User.findOne({username: req.body.username})
        !user && res.status(400).json("Invalid Credentials")

        const validate = await bcrypt.compare(req.body.password, user.password)
        !validate && res.status(400).json("Invalid Credentials")

        const {password, ...rest} = user._doc
        res.status(200).json(rest)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
