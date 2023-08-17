const crypto = require('node:crypto')
const { KEY } = require('../configs/config')

const generatePrivateAndPublicKey = () => {
    const privateKey = crypto.randomBytes(KEY.BYTES_NUM).toString(KEY.ENCODING)
    const publicKey = crypto.randomBytes(KEY.BYTES_NUM).toString(KEY.ENCODING)

    return { privateKey, publicKey }
}

module.exports = {
    generatePrivateAndPublicKey
}
