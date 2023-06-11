const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
 
const AuthController = {
    async register(req, res) {
 
        if(!req.body.name ||
            !req.body.email ||
            !req.body.password ||
            !req.body.password_confirmation) {
            res.status(400)
            res.json({
                success: false,
                message: 'Hiba! A bejövő adatok hibásak!'
            })
        }
 
        if(req.body.password != req.body.password_confirmation) {
            res.status(400).send({
                success: false,
                message: "A jelszavak nem egyeznek!"
            })
        }        
 
        try {
            User.findOne({
                where: {
                    name: req.body.name
                }
            })
            .then(user => {
                if(user) {
                    res.status(400)
                    res.json({ 
                        message: "A felhasználó már létezik: " + user.name
                    })
                }else {
                    const user = {
                        name: req.body.name,
                        email: req.body.email,
                        password: bcrypt.hashSync(req.body.password)
                    }
                    User.create(user)
                    .then( result => {
                        res.status(201)
                        res.json({
                            succes: true,
                            data: result
                        })
                    })
 
                }
            })
        } catch (error) {
            res.status(500)
            res.json({
                success: true,
                message: 'Hiba! A felhasználó létrehozása sikertelen'
            })
        }        
    },
    async login(req, res) {
        if(!req.body.name || !req.body.password) {
            res.status(400).send({
                message: "Hiba! A felhasználónév vagy jelszó hibás!"
            })
            return
        }
        const user = {
            name: req.body.name,
            password: bcrypt.hashSync(req.body.password)
        }
        User.findOne({
            where: {
                name: req.body.name
            }
        })
        .then(user => {
            if(!user) {
                return res.status(404).send({ message: "User not found."})
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if(!passwordIsValid) {
                res.status(401).send({
                    accessToken: null,
                    message: "Invalid password!"
                });
            }
            var token = jwt.sign({ id: user.id }, process.env.APP_KEY, {
                expiresIn: 86400 //24 óra
            });
            res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                accessToken: token
            });
        })        
    }

}
 
module.exports = AuthController
