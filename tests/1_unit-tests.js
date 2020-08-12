var chai = require("chai");
var assert = chai.assert;
var ConvertHandler = require("../controllers/convertHandler.js");

var convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  suite("Function convertHandler.getNum(input)", () => {
    test("Whole number input", (done) => {
      let input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("Decimal Input", (done) => {
      let input = "45.23km";
      assert.equal(convertHandler.getNum(input), 45.23);
      done();
    });

    test("Fractional Input", (done) => {
      let input = "1/2km";
      assert.equal(convertHandler.getNum(input), 0.5);
      done();
    });

    test("Fractional Input w/ Decimal", (done) => {
      let input = "4.3/2.15km";
      assert.equal(convertHandler.getNum(input), 2);
      done();
    });

    test("Invalid Input (double fraction)", (done) => {
      let input = "4/2/2km";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });

    test("No Numerical Input", (done) => {
      let input = "%gal";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });
  });

  suite("Function convertHandler.getUnit(input)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      let input = [
        "gal",
        "l",
        "mi",
        "km",
        "lbs",
        "kg",
        "GAL",
        "L",
        "MI",
        "KM",
        "LBS",
        "KG",
      ];
      input.forEach((ele) =>
        assert.equal(convertHandler.getUnit(ele), ele.toLowerCase())
      );
      done();
    });

    test("Unknown Unit Input", (done) => {
      let input = "10g";
      assert.equal(convertHandler.getUnit(input), "invalid unit");
      done();
    });
  });

  suite("Function convertHandler.getReturnUnit(initUnit)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = ["l", "gal", "km", "mi", "kg", "lbs"];
      input.forEach((ele, i) =>
        assert.equal(convertHandler.getReturnUnit(ele), expect[i])
      );
      done();
    });
  });

  suite("Function convertHandler.spellOutUnit(unit)", () => {
    test("For Each Valid Unit Inputs", (done) => {
      //see above example for hint
      let input = ["gal", "l", "mi", "km", "lbs", "kg"];
      let expect = [
        "gallons",
        "liters",
        "miles",
        "kilometers",
        "pounds",
        "kilograms",
      ];
      input.forEach((ele, i) =>
        assert.equal(convertHandler.spellOutUnit(ele), expect[i])
      );
      done();
    });
  });

  suite("Function convertHandler.convert(num, unit)", () => {
    test("Gal to L", (done) => {
      let input = [5, "gal"];
      let expected = 18.9271;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("L to Gal", (done) => {
      let input = [5, "l"];
      let expected = 1.32086;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Mi to Km", (done) => {
      let input = [5, "mi"];
      let expected = 8.04672;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Km to Mi", (done) => {
      let input = [5, "km"];
      let expected = 3.10686;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Lbs to Kg", (done) => {
      let input = [5, "lbs"];
      let expected = 2.26796;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("Kg to Lbs", (done) => {
      let input = [5, "kg"];
      let expected = 11.0231;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
  });
});
