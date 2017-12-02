var chai = require("chai");

var Inventory = require("../../app/inventory/inventory.js");

var expect = chai.expect;

describe("Inventory", function() {

    before(function(done) {
        var inventoryList = [
            { "sku": "ipd", "name": "Super iPad", "price": 549.99 },
            { "sku": "mbp", "name": "MacBook Pro", "price": 1399.99 },
            { "sku": "atv", "name": "Apple TV", "price": 109.50 },
            { "sku": "vga", "name": "VGA adapter", "price": 30.00 }
        ]
        inventory = new Inventory(inventoryList);
        done();
    });

    it("should return item of single type that exists", function(done) {
        expect(inventory.getItem("ipd").sku).to.be.equal("ipd");
        done();
    });

    it("should return undefined for type that doesn't exists", function(done) {
        expect(inventory.getItem("dsk")).to.be.equal(undefined);
        done();
    });

    it("should return complete inventory", function(done) {
        expect(Object.keys(inventory.getItems()).length).to.be.equal(4);
        done();
    });
});