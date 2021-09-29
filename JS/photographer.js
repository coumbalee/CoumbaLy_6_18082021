"use strict";
import {
  getPhotographersFromJson,
  getAllTagsFromPhotographers,
  getMediaFromJson,
} from "./dataFunction.js";
generateHeader();
displayPhotographerPage();

// // Fonction qui génère le logo du header
function generateHeader() {
  const img = document.createElement("img");
  img.src = "/IMAGES/logo.png";
  document.querySelector(".header__logo").appendChild(img);
}

// Fonction qui affiche les informations d'un photographe
function displayPhotographerInformation(photographer) {
  let photographerElt = document.querySelector(".photographer-section");
  console.log(photographerElt);
  photographerElt.innerHTML += `
    <div class="photographer-section__content">
       <h2 class="photographer-section__name">${photographer.name}</h2>
       <p class="photographer-section__localisation">
         ${photographer.city}, ${photographer.country}
      </p>
      <p class = "photographer-section__tagline"> ${photographer.tagline}</p>
      <div class="photographer__tags">${photographer.tags
        .map((tag) => `<button class="tag" data-tag="${tag}">#${tag}</button>`)
        .join("")}</div>
    </div>    
    </div>
    <button class ="photographer-section__contact>Contactez moi</button>`;
}

async function displayPhotographerPage() {
  const photographers = await getPhotographersFromJson();
  console.log(photographers);
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  console.log(id);
  const photographer = photographers.find((elt) => elt.id === parseInt(id, 10));

  displayPhotographerInformation(photographer);
}
