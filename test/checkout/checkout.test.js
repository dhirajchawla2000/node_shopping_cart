var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");

var Rules = require("../../app/rules/rules.js");
var Inventory = require("../../app/inventory/inventory.js");
var Checkout = require("../../app/checkout/checkout.js");

var expect = chai.expect;
chai.use(sinonChai);

describe("rules", function() {

    before(function(done) {
        var rulesList = [
            { "type": "3f2", "sku": "atv" },
            { "type": "bor", "sku": "ipd", "minQty": 4, "price": 400.00 },
            { "type": "fir", "sku": "mbp", "skuFree": "vga"}
        ];
        var inventoryList = [
            { "sku": "ipd", "name": "Super iPad", "price": 500.00 },
            { "sku": "mbp", "name": "MacBook Pro", "price": 1000.00 },
            { "sku": "atv", "name": "Apple TV", "price": 100.00 },
            { "sku": "vga", "name": "VGA adapter", "price": 30.00 }
        ]
        var inventory = new Inventory(inventoryList);
        var rules = new Rules(rulesList, inventory);
        checkout = new Checkout(rules, inventory);
        done();
    });

    it("should not scan invalid item from cart", function(done) {
        var sandbox = sinon.sandbox.create();
        sandbox.stub(console, "error");
        checkout.scan("dsk");
        expect(console.error).to.have.been.called;
        sandbox.restore();
        done();
    });

    it("should scan one item from cart", function(done) {
        expect(checkout.scan("ipd").total()).to.be.equal(500);
        done();
    });

    it("should scan two items from cart", function(done) {
        expect(checkout.scan("ipd").scan("ipd").total()).to.be.equal(1000);
        done();
    });

    it("should scan multiple items from cart", function(done) {
        expect(checkout.scan("ipd").scan("mbp").scan("atv").total()).to.be.equal(1600);
        done();
    });

    it("should scan items from cart and apply discount", function(done) {
        expect(checkout.scan("atv").scan("atv").scan("atv").total()).to.be.equal(200);
        done();
    });
});