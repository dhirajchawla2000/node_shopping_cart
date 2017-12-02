/**
 * Given a list of items it generates the inventory of those items
 * @constructs
 * @param {Array} itemsList 
 */
function Inventory(itemsList) {
    var items = {};

    itemsList.forEach(function(element) {
        items[element.sku] = element;
    });

    /**
     * Returns the complete inventory of items
     * @returns {Object} Inventory of items
     */
    this.getItems = function _getItems() {
        return items;
    }

    /**
     * Given an item sku, it returns the item from inventory
     * @param {string} sku - sku id of item in inventory
     * @returns {Object} Item
     */
    this.getItem = function _getItem(sku) {
        return items[sku];
    }
}

module.exports = Inventory;