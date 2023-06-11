const User = require('../models/user')
 


const UserController = {
    async index(req, res) {
        try {
            UserController.tryIndex(req, res)
        }catch(error) {
            res.status(500)
            res.json({
                success: false,
                message: 'Error! The query is failed!'
            })
        }
    },
    async tryIndex(req, res) {
        const users = await User.findAll()
        res.status(200)
        res.json({
            success: true,
            data: users
        })
    }
}

module.exports = UserController
