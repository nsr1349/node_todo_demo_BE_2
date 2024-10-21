const User = require('../model/User')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {}

userController.createUser = async (req, res) => {
    try {
        const { email , name, password } = req.body 
        const user = await User.findOne({ email })

        if (user) throw new Error('이미 가입되어 있단다')

        const newUser = new User({ email , name, password : bcrypt.hashSync(password, bcrypt.genSaltSync(saltRounds))})
        await newUser.save()

        res.status(200).json({status : 'success', data : newUser})
    } catch (err) {
        res.status(400).json({status : 'fail', err})
    }
}

userController.loginWithEmail = async (req, res) => {
    try {
        const { email, password } = req.body 
        const user = await User.findOne({ email }).select('-__v -createdAt -updatedAt')
        if (user){
            const isMath = bcrypt.compareSync(password, user.password)
            if (isMath){
                // const token = user.generateToken()
                // return res.status(200).json({status : 'success', user, token})
                return res.status(200).json({status : 'success', user})
            }
        }
    } catch (err) {
        res.status(400).json({status : 'fail', err})
    }
}


module.exports = userController