/**
 * Given a list of items in cart it scans the item and calculates total
 * cart amount after apply discount rules
 * @constructs
 * @param {Mapt} rules - Keeps rules list in key value pair
 * @param {Map} inventory - Keeps inventory of items in key value pair
 */
function Checkout (rules, inventory) {
    this.rules = rules;
    this.inventory = inventory;

    var shoppingCart = {};

    /**
     * Scans the item based on given sku and adds to cart after
     * calculating total amount or appies discount
     * @param {string} sku - sku id of item in inventory
     * @returns {Object} Reference of checkout object
     */
    this.scan = function _scan(sku) {

        if (this.inventory.getItem(sku) === undefined) {
            console.error("This is an invalid item sku:", sku);
            return this;
        }

        if (!shoppingCart[sku]) {
            shoppingCart[sku] = {
                item: inventory.getItem(sku),
                qty: 1,
                totalAmount: inventory.getItem(sku).price
            }
        }
        else {
            shoppingCart[sku].qty++;
            shoppingCart[sku].totalAmount = shoppingCart[sku].qty * shoppingCart[sku].item.price;
        }

        var rule = this.rules.getRule(sku);
        if (rule !== undefined) {
            rule.applyRule(shoppingCart);
        }

        return this;
    }

    /**
     * Calculates total amount of items in cart
     * @returns {number} Total amount of items in cart
     */
    this.total = function _total() {
        var totalAmount = 0;
        for (var key in shoppingCart) {
            if (shoppingCart.hasOwnProperty(key)) {
                totalAmount += shoppingCart[key].totalAmount;
            }
        }
        shoppingCart = {};
        return totalAmount;
    }
}

module.exports = Checkout;