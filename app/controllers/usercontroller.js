const User = require('../models/user')
 


const UserController = {
    async index(req, res) {
        try {
            const users = await User.findAll()
            res.status(200)
            res.json({
                success: true,
                data: users
            })
        }catch(error) {
            res.status(500)
            res.json({
                success: false,
                message: 'Error! The query is failed!'
            })
        }
    }
}

module.exports = UserController
