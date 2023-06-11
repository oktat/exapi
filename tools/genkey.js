const fs = require('fs').promises
const path = require('path')
const fileName = '../config/default.json'
const { generateApiKey } = require('generate-api-key')

function generateKey(size = 32, format = 'base64') {
    const buffer = crypto.randomBytes(size);
    return buffer.toString(format);
}

fs.readFile(path.join(__dirname, fileName))
    .then(body => JSON.parse(body))
    .then(json => {
        json.app.key = generateApiKey({method: 'bytes', length: 32})
        return json
    })
    .then(json => JSON.stringify(json, null, 4))
    .then(body => fs.writeFile(path.join(__dirname, fileName), body, 'utf8'))
    .catch(error => console.log(error))
