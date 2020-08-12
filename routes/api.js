const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route("/api/convert").get((req, res) => {
    const input = req.query.input;

    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    if (initNum === "invalid number" && initUnit === "invalid unit")
      return res.json({ error: "invalid number and unit" });

    if (initNum === "invalid number") return res.json({ error: initNum });
    if (initUnit === "invalid unit") return res.json({ error: initUnit });

    const returnNum = convertHandler.convert(initNum, initUnit);

    const returnUnit = convertHandler.getReturnUnit(initUnit);

    const toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    // console.log(initNum);
    // console.log(initUnit);
    // console.log(returnNum);
    // console.log(returnUnit);
    // console.log(toString);

    res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: toString,
    });
  });
};
