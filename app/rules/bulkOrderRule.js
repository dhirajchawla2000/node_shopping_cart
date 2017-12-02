/**
 * This function applies the Bulk Order rule on given item
 * @constructs
 * @param {string} sku - sku id of item
 * @param {number} minQty - minimum quantity for rule to be appicable
 * @param {number} price - price applicable when condition is satisfied
 */
function BulkOrderRule(sku, minQty, price) {
    this.sku = sku;
    this.minQty = minQty;
    this.price = price;

    /**
     * Given a cart applies the Bulk Order rule
     * @param {Object} cart - Cart object
     */
    this.applyRule = function _applyRule(cart) {
        if (cart[this.sku] !== undefined) {
            var price = cart[this.sku].qty > this.minQty ? this.price : cart[this.sku].item.price;
            cart[this.sku].totalAmount = price * cart[this.sku].qty;
        }
    }
}

module.exports = BulkOrderRule;