import locations from "./location.json" assert { type: "json" };
const stateSelect = document.querySelector("#state-select");
const citySelect = document.querySelector("#city-select");
const submitButton = document.querySelector("#btn");
const resultContainer = document.querySelector(".result-container");
let stateSelectValue = "";
let citySelectValue = "";

function addStatesToSelect() {
  locations.estados.forEach((estado) => {
    const option = document.createElement("option");
    option.value = estado.nome;
    option.textContent = estado.nome;
    stateSelect.append(option);
  });
}

function addCitiesToSelect() {
  citySelect.textContent = "";
  const defaultOption = document.createElement("option");
  defaultOption.textContent = "selecione uma cidade";
  defaultOption.setAttribute("value", "");
  defaultOption.setAttribute("disabled", true);
  defaultOption.setAttribute("selected", true);
  citySelect.append(defaultOption);

  locations.estados
    .find((estado) => estado.nome === stateSelectValue)
    .cidades.forEach((cidade) => {
      const option = document.createElement("option");
      option.value = cidade;
      option.textContent = cidade;
      citySelect.append(option);
    });
}

function handleStatesSelectOnChange() {
  stateSelectValue = stateSelect.value;
  citySelectValue = "";
  addCitiesToSelect();
}

function handleCitiesSelectOnChange() {
  citySelectValue = citySelect.value;
}

function handleSubmitButton() {
  if (citySelectValue && stateSelectValue) {
    resultContainer.textContent = "";
    const resultState = document.createElement("p");
    const resultCity = document.createElement("p");
    resultState.textContent = "Seu estado é " + stateSelectValue;
    resultCity.textContent = "Sua cidade é " + citySelectValue;
    resultContainer.append(resultState, resultCity);
    resultContainer.style.display = "flex";
  }
}

function main() {
  addStatesToSelect();
  stateSelect.addEventListener("change", handleStatesSelectOnChange);

  citySelect.addEventListener("change", handleCitiesSelectOnChange);

  submitButton.addEventListener("click", handleSubmitButton);
}
main();
