// API

const url = "http://api.nbp.pl/api/exchangerates/tables/A?format=json";

// Global Constants

const select = document.querySelector("#select-currency");
const inputValue = document.querySelector("#value");
const result = document.querySelector("#result-pln");
const button = document.querySelector("#calculate-btn");

// Async

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    console.log(data[0].rates);
    data[0].rates.forEach((rate) => {
      if (["EUR", "USD", "CHF"].includes(rate.code)) {
        const option = document.createElement("option");
        option.setAttribute("value", rate.code);
        document.querySelector("#select-currency").appendChild(option);
        option.innerText = rate.code;
      }
    });
    button.addEventListener("click", () => {
      const currentOption = select.value;
      const currentRate = data[0].rates.find(
        (item) => currentOption === item.code
      ).mid;
      result.textContent = inputValue.value * currentRate;
    });
  })
  .catch((err) => {
    console.error(err);
    return "Nie mozna wyświetlić kursu walut";
  });
