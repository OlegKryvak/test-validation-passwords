import _ from "lodash";

const count = (str, ch) => _.countBy(str)[ch] || 0;

const characterInPasswordCounter = (fileLines) => {
  const validPaswordsArray = fileLines.filter((el) => {
    const [character, allowedAmount, password] = el.split(" ");
    const [minAmount, maxAmount] = allowedAmount?.slice(0, -1)?.split("-");
    const totalCharacterCount = count(password, character);
    const num_in_range = _.inRange(totalCharacterCount, +minAmount, +maxAmount);
    if (num_in_range) return el;
  });
  const validPaswordsAmount = validPaswordsArray.length;
  return validPaswordsAmount;
};

fetch("data.txt")
  .then((response) => response.text())
  .then((text) => {
    const fileLines = text.split("\n").filter(Boolean);
    const result = characterInPasswordCounter(fileLines);
    document.getElementById("app").innerHTML = fileLines;
    console.log(fileLines);
    console.log(result);
  })
  .catch(function (err) {
    console.log("Fetch problem show: " + err.message);
  });
