var chai = require("chai");

var ThreeForTwoRule = require("../../app/rules/threeForTwoRule.js");
var BulkOrderRule = require("../../app/rules/bulkOrderRule.js");
var FreeItemRule = require("../../app/rules/freeItemRule.js");
var Rules = require("../../app/rules/rules.js");
var Inventory = require("../../app/inventory/inventory.js");

var expect = chai.expect;

describe("rules", function() {

    before(function(done) {
        var rulesList = [
            { "type": "3f2", "sku": "atv" },
            { "type": "bor", "sku": "ipd", "minQty": 4, "price": 499.99 },
            { "type": "fir", "sku": "mbp", "skuFree": "vga"}
        ];
        var inventoryList = [
            { "sku": "ipd", "name": "Super iPad", "price": 549.99 },
            { "sku": "mbp", "name": "MacBook Pro", "price": 1399.99 },
            { "sku": "atv", "name": "Apple TV", "price": 109.50 },
            { "sku": "vga", "name": "VGA adapter", "price": 30.00 }
        ]
        var inventory = new Inventory(inventoryList);
        rules = new Rules(rulesList, inventory);
        done();
    });

    it("should be of Bulk Order Rule type", function(done) {
        expect(rules.getRule("ipd")).instanceof(BulkOrderRule);
        done();
    });

    it("should be of Free Item Rule type", function(done) {
        expect(rules.getRule("mbp")).instanceof(FreeItemRule);
        done();
    });

    it("should be of Three for Two Rule type", function(done) {
        expect(rules.getRule("atv")).instanceof(ThreeForTwoRule);
        done();
    });
});