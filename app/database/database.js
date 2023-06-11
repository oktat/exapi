const Sequalize = require('sequelize')
const config = require('../../config/default.json')

if(config.app.log != false) {
    var log = console.log
}

console.log(typeof console.log)
const sequalize = new Sequalize(
    config.db.name,
    config.db.user, 
    config.db.pass,
    {
        logging: log,
        dialect: config.db.dialect,
        storage: config.db.path,
        host: config.db.host,
        dialectOptions: {}
    }
)
 
module.exports = sequalize