var chai = require("chai");

var FreeItemRule = require("../../app/rules/freeItemRule.js");

var expect = chai.expect;

describe("freeItemRule", function() {

    it("should return total price when no free item in cart", function(done) {
        var item = {};
        item["mbp"] = {
            item: {
                sku: "mbp",
                price: 1000
            },
            qty: 1,
            totalAmount: 1000
        };
        var rule = new FreeItemRule("mbp", "vga");
        rule.applyRule(item);
        expect(item["mbp"].totalAmount).to.be.equal(1000);
        done();
    });

    it("should return total price when one free item in cart", function(done) {
        var item = {};
        item["mbp"] = {
            item: {
                sku: "mbp",
                price: 1000
            },
            qty: 1,
            totalAmount: 1000
        };
        item["vga"] = {
            item: {
                sku: "vga",
                price: 30
            },
            qty: 1,
            totalAmount: 0
        };
        var rule = new FreeItemRule("mbp", "vga");
        rule.applyRule(item);
        expect(item["mbp"].totalAmount + item["vga"].totalAmount).to.be.equal(1000);
        done();
    });

    it("should return total price when two free items in cart ", function(done) {
        var item = {};
        item["mbp"] = {
            item: {
                sku: "mbp",
                price: 1000
            },
            qty: 1,
            totalAmount: 1000
        };
        item["vga"] = {
            item: {
                sku: "vga",
                price: 30
            },
            qty: 2,
            totalAmount: 0
        };
        var rule = new FreeItemRule("mbp", "vga");
        rule.applyRule(item);
        expect(item["mbp"].totalAmount + item["vga"].totalAmount).to.be.equal(1030);
        done();
    });
});