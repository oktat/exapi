const Router = require('express')
const router = Router()

const AuthController = require('../controllers/authcontroller')
const UserController = require('../controllers/usercontroller')
const { verifyToken } = require('../middleware/authjwt')
 
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
// router.get('/users', [verifyToken], UserController.index)
router.get('/users', UserController.index)
 
module.exports = router
