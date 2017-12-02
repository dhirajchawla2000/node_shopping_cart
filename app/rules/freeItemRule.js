/**
 * This function applies the Free Item rule on given item
 * @constructs
 * @param {string} sku - sku id of item
 * @param {string} skuFree - sku id of free item
 */
function FreeItemRule(sku, skuFree) {
    this.sku = sku;
    this.skuFree = skuFree;

    /**
     * Given a cart applies the Free Item rule
     * @param {Object} cart - Cart object
     */
    this.applyRule = function _applyRule(cart) {
        if (cart[this.sku] !== undefined && cart[this.skuFree] !== undefined) {
            var diff = cart[this.skuFree].qty - cart[this.sku].qty;
            var calc = diff > 0 ? diff : 0;
            cart[this.skuFree].totalAmount = cart[this.skuFree].item.price * calc;
        }
    }
}

module.exports = FreeItemRule;