var express = require("express");
var router = express.Router();

const randInteger = (max, min = 0) =>
  Math.floor(Math.random() * (max - min + 1));

const descriptions = ["Meeting", "Coding", "Working", "Developing", "Stand-up"];

const generateRandomEntry = () => ({
  description: descriptions[randInteger(descriptions.length - 1, 0)],
  project: "Project " + randInteger(9, 1),
  hours: randInteger(8, 1),
});

const generateRandomEntries = (max, min) => {
  const entries = randInteger(max, min);
  return new Array(entries).fill().map(() => generateRandomEntry());
};

const generateDaysOfMonth = (year, m) => {
  const month = m - 1;
  const date = new Date(year, month, 1);
  let days = [];
  do {
    days.push(date.getDate());
    date.setDate(date.getDate() + 1);
  } while (date.getMonth() === month);
  return days;
};

const simulateEntries = (year, month) => {
  return generateDaysOfMonth(year, month)
    .filter(() => !randInteger(1, 0))
    .reduce((entries, d) => (
        {
          ...entries,
          [`${year}-${month}-${d}`]: generateRandomEntries(5, 2)
        })
    , {});
};


router.get("/:year/:month", function (req, res, next) {
  const { year, month } = req.params;
  res.json({
    monthly: simulateEntries(year, month),
  });
});

module.exports = router;
