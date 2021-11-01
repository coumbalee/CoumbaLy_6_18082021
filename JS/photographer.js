"use strict";
import {
  getPhotographersFromJson,
  getMediaFromPhotographer,
} from "./dataFunction.js";
import {
  factory,
  displayPhotographerInformation,
  generateHeader,
  getPhotographerIdFromUrl,
  displayLightbox,
  generateDropdownMenu,
  // removeLightbox,
} from "./functions.js";
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

  // créer ici une ul
  let mediaElt = document.querySelector(".media-section");
  const cardList = document.createElement("ul");
  cardList.classList.add("media-section__cards");
  mediaElt.append(cardList);
  let baseUrl = `./IMAGES/${photographerSurname}`;
  photographerMedias.forEach((elt) => {
    let media = factory(elt);

    if (media !== undefined && media.displayInList(baseUrl) !== undefined) {
      cardList.innerHTML += media.displayInList(baseUrl);
    }
  });
  displayLightbox(photographerMedias, baseUrl);
  generateDropdownMenu();
}

function getSurname(name) {
  let cuttedName = "";
  // https://stackoverflow.com/a/26425713
  var stringArray = name.split(/(\s+)/);
  const surname = stringArray[0];
  // https://stackoverflow.com/q/14262770
  cuttedName = surname.replace("-", " ");
  return cuttedName;
}
