var Rules = require("./rules/rules.js");
var Inventory = require("./inventory/inventory.js");
var Checkout = require("./checkout/checkout.js");

/**
 * Main application that checks out items based on given rules, inventory
 * and cart details
 * @param {Object} data - JSON object which contains details of rules, inventory
 * and carts 
 */
function App(data) {

    var inventory = new Inventory(data.shoppingItems);
    var rules = new Rules(data.rules, inventory);
    var checkout = new Checkout(rules, inventory);

    /**
     * Executes the checkout system and prints the total amount for each cart
     * to the console
     */
    this.execute = function _execute() {
        data.carts.forEach(function(cart, index) {
            cart.forEach(function(item){
                checkout.scan(item);
            });
            console.log("Cart " + (index+1) + " Total Amount: $" + checkout.total());
        });
    }
}

module.exports = App;