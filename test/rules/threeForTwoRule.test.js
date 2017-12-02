var chai = require("chai");

var ThreeForTwoRule = require("../../app/rules/threeForTwoRule.js");

var expect = chai.expect;

describe("threeForTwoRule", function() {

    it("should not apply three for two discount", function(done) {
        var item = {};
        item["atv"] = {
            item: {
                sku: "atv",
                price: 200
            },
            qty: 2,
            totalAmount: 0
        };
        var rule = new ThreeForTwoRule("atv");
        rule.applyRule(item);
        expect(item["atv"].totalAmount).to.be.equal(400);
        done();
    });

    it("should apply three for two discount", function(done) {
        var item = {};
        item["atv"] = {
            item: {
                sku: "atv",
                price: 200
            },
            qty: 3,
            totalAmount: 0
        };
        var rule = new ThreeForTwoRule("atv");
        rule.applyRule(item);
        expect(item["atv"].totalAmount).to.be.equal(400);
        done();
    });
});