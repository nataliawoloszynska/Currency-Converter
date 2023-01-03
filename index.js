// API

const url = "https://api.nbp.pl/api/exchangerates/tables/A?format=json";

// Global Constants

const select = document.querySelector("#select-currency");
const inputAmount = document.querySelector("#amount-pln");
const result = document.querySelector("#result-pln");
const button = document.querySelector("#calculate-btn");

// Async

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const rates = data[0].rates;
    rates.forEach((rate) => {
      if (["EUR", "USD", "CHF"].includes(rate.code)) {
        const option = document.createElement("option");
        option.setAttribute("value", rate.code);
        select.appendChild(option);
        option.innerText = rate.code;
      }
    });
    button.addEventListener("click", () => {
      const currentOption = select.value;
      const currentRate = rates.find((item) => currentOption === item.code).mid;
      let resultValue = inputAmount.value * currentRate;
      const roundedResultValue = resultValue.toFixed(2);
      result.textContent = `${roundedResultValue} PLN`;
    });
  })
  .catch((err) => {
    console.error(err);
    result.textContent = `Nie mozna wyświetlić kursu walut`;
  });
