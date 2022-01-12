"use strict";
import {
  getPhotographersFromJson,
  getMediaFromPhotographer,
} from "./dataFunction.js";
import {
  addListenersToDropDown,
  displayMediasList,
  displayPhotographerInformation,
  generateHeader,
  getPhotographerIdFromUrl,
  generateDropdownMenu,
  incrementLikes,
  showPrice,
} from "./functions.js";

function likeReducer(previous, current) {
  return previous + current;
}

generateHeader();
displayPhotographerPage();

// fonction asynchrone qui gere l' affichage de la page
async function displayPhotographerPage() {
  // PHOTOGRAPHES
  const photographers = await getPhotographersFromJson();
  const id = parseInt(getPhotographerIdFromUrl(), 10);
  const photographer = photographers.find((elt) => elt.id === parseInt(id, 10));
  const photographerSurname = getSurname(photographer.name);
  displayPhotographerInformation(photographer);
  // MEDIAS
  const photographerMedias = await getMediaFromPhotographer(id);

  document.querySelector(".information-section__likes").textContent =
    photographerMedias.map((elt) => elt.likes).reduce(likeReducer, 0);

  // créer ici une ul pour les medias
  let mediaElt = document.querySelector(".media-section");
  const cardList = document.createElement("ul");
  cardList.classList.add("media-section__cards");
  mediaElt.append(cardList);
  let baseUrl = `./IMAGES/${photographerSurname}`;
  displayMediasList(photographerMedias, baseUrl, cardList);
  // DROPDOWN
  generateDropdownMenu();
  addListenersToDropDown(photographerMedias, baseUrl);
  // LIKES et PRIX
  incrementLikes();
  showPrice(photographer);
}
function getSurname(name) {
  let cuttedName = "";
  // https://stackoverflow.com/a/26425713
  const stringArray = name.split(/(\s+)/);
  const surname = stringArray[0];
  // https://stackoverflow.com/q/14262770
  cuttedName = surname.replace("-", " ");
  return cuttedName;
}

document.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    e.target.click();
  }
});
