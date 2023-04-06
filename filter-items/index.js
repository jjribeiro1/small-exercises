import { items } from "./data.js";
const socialOptionsContainer = document.querySelector(
  "#social-options-container"
);
const summaryList = document.querySelector("#selected-summary");
const filterTextSummary = document.querySelector("#filter-text");
const resetFilterButton = document.querySelector("#reset-filter");
const cardListContainer = document.querySelector(".items-list");
const initialListItems = items.data.map((item) => item);
let selectedOptions = [];

items.socialOptions.forEach((optionName) => {
  const socialOptionElement = document.createElement("div");
  socialOptionElement.classList.add("social-item");
  socialOptionElement.textContent = optionName;
  socialOptionElement.addEventListener("click", handleSocialOptionClick);
  socialOptionsContainer.appendChild(socialOptionElement);
});

cardListContainer.append(...initialListItems.map(createCardElement));
resetFilterButton.addEventListener("click", resetFilterList);

function handleSocialOptionClick(e) {
  const selectedSocialOption = e.target.textContent;
  const alreadySelected = selectedOptions.includes(selectedSocialOption);
  if (!alreadySelected) {
    addFilterToCardList(selectedSocialOption);
    shouldDisplayElements();
    createItemSummary(selectedSocialOption);
  }
}

function addFilterToCardList(clickedSocialOption) {
  selectedOptions.push(clickedSocialOption);
  const cardElements = initialListItems
    .filter((item) => selectedOptions.includes(item.socialType))
    .map(createCardElement);
  cardListContainer.textContent = "";
  cardListContainer.append(...cardElements);
}

function resetFilterList() {
  selectedOptions = [];
  summaryList.textContent = "";
  cardListContainer.textContent = "";
  cardListContainer.append(...initialListItems.map(createCardElement));
  shouldDisplayElements();
}


function removeOneFilter(e) {
  const itemName = e.target.parentNode.getAttribute("data-item-name");
  const itemIndexToRemove = selectedOptions.indexOf(itemName);

  if (itemIndexToRemove !== -1) {
    selectedOptions.splice(itemIndexToRemove, 1);
  }

  if (selectedOptions.length === 0) {
    resetFilterList();
  } else {
    const summaryItem = e.target.parentNode
    summaryItem.remove()
    const cardElements = initialListItems
      .filter((item) => selectedOptions.includes(item.socialType))
      .map(createCardElement);
    cardListContainer.textContent = "";
    cardListContainer.append(...cardElements);
  }
}

function shouldDisplayElements() {
  if (selectedOptions.length > 0) {
    summaryList.style.display = "flex";
    filterTextSummary.style.display = "block";
    summaryList.insertAdjacentElement("afterbegin", filterTextSummary);
    resetFilterButton.style.display = "block";
  } else {
    summaryList.style.display = "none";
    filterTextSummary.style.display = "none";
    resetFilterButton.style.display = "none";
  }
}

function createItemSummary(itemName) {
  const summaryElement = document.createElement("div");
  summaryElement.classList.add("summary-item");
  summaryElement.textContent = itemName;
  summaryElement.setAttribute("data-item-name", itemName);

  const closeElement = document.createElement("span");
  closeElement.setAttribute("id", "close");
  closeElement.textContent = "x";
  closeElement.addEventListener("click", removeOneFilter);

  summaryElement.append(closeElement);
  summaryList.append(summaryElement);

  return summaryElement;
}

function createCardElement(item) {
  const cardElement = document.createElement("li");
  cardElement.classList.add("card");
  const nameElement = document.createElement("span");
  const socialElement = document.createElement("span");
  nameElement.textContent = `Nome: ${item.name}`;
  socialElement.textContent = `Rede Social: ${item.socialType}`;
  cardElement.append(nameElement, socialElement);
  return cardElement;
}
