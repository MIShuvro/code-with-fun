const util = require('util');
const {
    randomBytes
} = require('crypto')


const randomBytesPromoise = util.promisify(randomBytes)
const token = randomBytesPromoise(25)
    .then(res => console.log(res.toString('hex')))