const characterInPasswordCounter = (fileLines)=>{
  const validPaswordsArray = fileLines.filter((el) => {
    const [character, allowedAmount, password] = el.split(" ");
    const [minAmount, maxAmount] = allowedAmount.slice(0, -1).split("-");
    const totalCharacterCount = (
      password.match(new RegExp(character, "g")) || []
    ).length;
    if (
      +minAmount <= totalCharacterCount &&
      totalCharacterCount <= +maxAmount
    ) {
      return el;
    }
  });
  const validPaswordsAmount = validPaswordsArray.length; 
  return validPaswordsAmount;
}

fetch("data.txt")
  .then((response) => response.text())
  .then((text) => {
    const fileLines = text.split("\n");
    const result = characterInPasswordCounter(fileLines)
    console.log(result);
  }).catch(err=>{
    console.error('There is an error: ', err);
  });
