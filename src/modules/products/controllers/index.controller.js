const wallet = require('./wallet.controller');
const merchant = require('./merchant.controller');

module.exports = {
    wallet:{...wallet},
    merchant:{...merchant}

}