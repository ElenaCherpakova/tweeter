//Implement the character counter
let maxLength = 140;
$(document).ready(function () {
  $("form")
    .find("textarea")
    .keyup(function () {
      const numOfLetters = $(this).val().length;
      const numberCharacters = maxLength - numOfLetters;
      if (numberCharacters < 0) {
        ["-".numOfLetters].join("");
        $("output").addClass("negativeNum");
        $("output").text(numberCharacters);
      } else {
        $("output").removeClass("negativeNum");
        $("output").text(numberCharacters);
      }
    });
});
