const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../../config/default.json')
 
const AuthController = {
    async register(req, res) {
        var clientError = false;
        try {
            if(!req.body.name ||
                !req.body.email ||
                !req.body.password ||
                !req.body.password_confirmation) {
                clientError = true
                throw new Error('Error! Bad request data!')
            }
            if(req.body.password != req.body.password_confirmation) {
                clientError = true
                throw new Error('Error! The two password is not same!')
            }
            await User.findOne({
                where: { name: req.body.name }
            })
            .then(user => {
                if(user) {
                    clientError = true
                    throw new Error('Error! User already exists: ' + user.name)
                }
                AuthController.tryRegister(req, res)
            })
            
        } catch (error) {
            if (clientError) {
                res.status(400)
            }else {
                res.status(500)
            }            
            await res.json({
                success: false,
                message: 'Error! User creation failed!',
                error: error.message
            })            
        }
    },
    async tryRegister(req, res) {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        }
        await User.create(user)
        .then( result => {
            res.status(201)
            res.json({
                succes: true,
                data: result
            })
        })
    },
    async login(req, res) {
        
        try {
            if(!req.body.name || !req.body.password) {
               res.status(400)
               throw new Error('Error! Bad name or password!')
            }
            const user = {
                name: req.body.name,
                password: bcrypt.hashSync(req.body.password)
            }
            User.findOne({
                where: {  name: req.body.name }
            })
            .then(user => {
                if(!user) {
                    res.status(404)
                    throw new Error('Error! User not found!')                    
                }
                passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    user.password
                );
                if(!passwordIsValid) {
                    res.status(401)
                    throw new Error('Erorr! Invalid password!')
                }
                AuthController.tryLogin(req, res, user)
            })                    
        } catch (error) {
            if(res.statusCode<400) {
                res.status(500)
                res.json({
                    success: false,
                    message: 'Error! The login is failed!',
                    error: error.message
                })
            }
        }
    },
    async tryLogin(req, res, user) {
        var token = jwt.sign({ id: user.id }, config.app.key, {
            expiresIn: 86400 //24 óra
        })
        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: token
        })            
    }
}
 
module.exports = AuthController
