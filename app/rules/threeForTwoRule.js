/**
 * This function applies the Three for Two rule on given item
 * @constructs
 * @param {string} sku - sku id of item in inventory
 */
function ThreeFroTwoRule(sku) {
    this.sku = sku;

    /**
     * Given a cart applies the Three for Two rule
     * @param {Object} cart - Cart object
     */
    this.applyRule = function _applyRule(cart) {
        if (cart[this.sku] !== undefined) {
            cart[this.sku].totalAmount = 
                (cart[this.sku].qty - Math.floor(cart[this.sku].qty/3)) * cart[this.sku].item.price;
        }
    }
}

module.exports = ThreeFroTwoRule;