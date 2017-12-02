var chai = require("chai");

var BuldOrderRule = require("../../app/rules/bulkOrderRule.js");

var expect = chai.expect;

describe("bulkOrderRule", function() {

    it("should return actual total price of item", function(done) {
        var item = {};
        item["ipd"] = {
            item: {
                sku: "ipd",
                price: 200
            },
            qty: 2,
            totalAmount: 0
        };
        var rule = new BuldOrderRule("ipd", 3, 150);
        rule.applyRule(item);
        expect(item["ipd"].totalAmount).to.be.equal(400);
        done();
    });

    it("should return discounted total price of item", function(done) {
        var item = {};
        item["ipd"] = {
            item: {
                sku: "ipd",
                price: 200
            },
            qty: 4,
            totalAmount: 0
        };
        var rule = new BuldOrderRule("ipd", 3, 150);
        rule.applyRule(item);
        expect(item["ipd"].totalAmount).to.be.equal(600);
        done();
    });
});