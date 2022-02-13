const cart = require('./cart.controller');
const order = require('./order.controller');
const merchant = require('./merchant.controller');

module.exports = {
    cart:{...cart},
    order:{...order},
    merchant:{...merchant}

}