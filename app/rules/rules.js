var BulkOrderRule = require("./bulkOrderRule.js");
var FreeItemRule = require("./freeItemRule.js");
var ThreeFroTwoRule = require("./threeForTwoRule.js");

/**
 * Given a list of rules and inventory, it creates a unique rule list
 * based on item to which the rule will be applicable
 * @constructs
 * @param {Array} rulesList 
 * @param {Array} inventory 
 */
function Rules(rulesList, inventory) {
    var rules = {};

    rulesList.forEach(function(element) {
        if (!inventory.getItem(element.sku)) {
            console.error("Invalid sku item present in rules list:", element.sku, element.type);
        }
        else {
            if (!rules[element.sku]) {
                var ruleFunction;
                switch(element.type) {
                    case "3f2":
                        rules[element.sku] = new ThreeFroTwoRule(element.sku);
                        break;
                    case "bor":
                        rules[element.sku] = new BulkOrderRule(element.sku, element.minQty, element.price);
                        break;
                    case "fir":
                        rules[element.sku] = new FreeItemRule(element.sku, element.skuFree);
                        rules[element.skuFree] = new FreeItemRule(element.sku, element.skuFree);
                        break;
                    default:
                        console.error("This is an invalid rule type:", element.type)
                        break;
                }
            }    
        }
    });

    /**
     * Returns a rule that is applicable to given item
     * @param {string} sku - sku id of item in inventory
     * @returns {Object} Rule that is applicable 
     */
    this.getRule = function _getRule(sku) {
        return rules[sku];
    }
}

module.exports = Rules;