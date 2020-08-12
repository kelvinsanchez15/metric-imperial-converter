const { init } = require("../app");

const unitsObj = {
  gal: { name: "gallons", symbol: "gal", factor: 3.78541, to: "l" },
  l: { name: "liters", symbol: "l", factor: 0.26417, to: "gal" },
  mi: { name: "miles", symbol: "mi", factor: 1.60934, to: "km" },
  km: { name: "kilometers", symbol: "km", factor: 0.62137, to: "mi" },
  lbs: { name: "pounds", symbol: "lbs", factor: 0.453592, to: "kg" },
  kg: { name: "kilograms", symbol: "kg", factor: 2.20462, to: "lbs" },
};

class ConvertHandler {
  getNum(input) {
    let index = input.search(/[a-zA-Z]/);

    // Handle empty number with defaul
    if (index <= 0) return 1;

    input = input.substring(index, 0);

    // Split and divide in case of fractional number
    if (input.match(/\//g)) {
      if (input.match(/\//g).length > 1) return "invalid number";
      let split = input.split("/");
      input = split[0] / split[1];
    }

    // Handle invalid number
    if (isNaN(input)) return "invalid number";

    return parseFloat(input);
  }

  getUnit(input) {
    let unit = input.match(/[a-zA-Z]+/g);

    if (!unit || !unitsObj.hasOwnProperty(unit[0].toLowerCase()))
      return "invalid unit";

    return unit[0].toLowerCase();
  }

  getReturnUnit(initUnit) {
    return unitsObj[initUnit].to;
  }

  spellOutUnit(unit) {
    return unitsObj[unit].name;
  }

  convert(initNum, initUnit) {
    return Math.round(initNum * unitsObj[initUnit].factor * 100000) / 100000;
  }

  getString(initNum, initUnit, returnNum, returnUnit) {
    initUnit = this.spellOutUnit(initUnit);
    returnUnit = this.spellOutUnit(returnUnit);

    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  }
}

module.exports = ConvertHandler;
