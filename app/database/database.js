const Sequalize = require('sequelize')
require('dotenv').config()

var log = false
if(process.env.LOG != 'false') {
    log = console.log
}

console.log(typeof console.log)
const sequalize = new Sequalize(
    process.env.DB_NAME,
    process.env.DB_USER, 
    process.env.DB_PASS,
    {
        logging: log,
        dialect: process.env.DB_DIALECT,
        storage: process.env.DB_PATH,
        host: process.env.DB_HOST,        
        dialectOptions: {}
    }
)
 
module.exports = sequalize