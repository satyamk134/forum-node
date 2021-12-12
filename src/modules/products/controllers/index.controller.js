const cart = require('./cart.controller');
const order = require('./order.controller');

module.exports = {
    cart:{...cart},
    order:{...order}
}