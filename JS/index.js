"use strict";
import {
  getPhotographersFromJson,
  getAllTagsFromPhotographers,
} from "./dataFunction.js";

generateHeader();
// afficher les tags des photographers en html
getPhotographersFromJson().then((photographers) => {
  console.log(photographers);
  const tags = getAllTagsFromPhotographers(photographers);
  console.log(tags);
  displayTagsMenu(tags);
  showPhotographers(photographers);
});

// Afficher les valeurs des propriétés de chaque photographe

function showPhotographers(photographers) {
  let photographersElt = document.querySelector("#photographers");
  photographers.forEach((photographer) => {
    photographersElt.innerHTML += `
    <li class="photographer"><a href="#">
    <img src ="./IMAGES/Photographers%20ID%20Photos/${
      photographer.portrait
    }" class ="photographer__img">
    <div class= "photographer__content">
      <h2 class="photographer__name">${photographer.name}</h2>
      <p class="photographer__localisation">${photographer.city}, ${
      photographer.country
    }</p>
      <p class="photographer__tagline">${photographer.tagline}</p>
      <p class="photographer__price">${photographer.price} / jour</p>
      <div class="photographer__tags">${photographer.tags
        .map((tag) => `<button class="tag" data-tag="${tag}">#${tag}</button>`)
        .join("")}</div>
    </div>    
      </a>
</li>
      `;
  });
}

function displayTagsMenu(tags) {
  let tagsElt = document.querySelector("#tags");
  tags.forEach((tag) => {
    tagsElt.innerHTML += `<button class="tag" data-tag="${tag}">#${tag}</button>`;
  });
  document.querySelectorAll("#tags span").forEach((span) => {
    span.addEventListener("click", (e) => {
      // alert(e.target.dataset.tag);
    });
  });
}
function generateHeader() {
  // création du lien  du header
  const header = document.querySelector("header");
  const headerLink = document.createElement("a");
  headerLink.classList.add("header__link");
  headerLink.innerHTML = "Passer au contenu";
  header.prepend(headerLink);

  // insertion du logo
  const img = document.createElement("img");
  img.src = "/IMAGES/logo.png";
  document.querySelector(".header__logo").appendChild(img);

  // création du titre 'Nos photographes' dans main
  const main = document.querySelector("main");
  const mainTitle = document.createElement("h1");
  mainTitle.classList.add("h1");
  mainTitle.innerHTML = "Nos photographes";
  main.prepend(mainTitle);
}

// Fonction de filtres des photographes par tags
document.querySelector("tags").onclick = function () {
  // selection des tags
  const tags = [];
  // filtrer les tags selon critères de matching avec profils
  const filtered = tags.filter();
  // retourner les profils correspondants
  return;
};

// Recuperer TOUS les tags qui ont la class tag

// Ajouter un eventListener sur chacun des tag

// quand je clique sur le tag je recup la valeur du tag

// on trie le tableau des photographes pour n'avoir que les photographes qui ont se tag

// on affiche que les photographes qui ont le tag
