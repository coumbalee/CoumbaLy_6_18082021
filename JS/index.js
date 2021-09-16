"use strict";
import {
  getPhotographersFromJson,
  getAllTagsFromPhotographers,
} from "./dataFunction.js";

generateHeader();
// afficher les tags des photographers en html
getPhotographersFromJson().then((photographers) => {
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
    <li class="photographer">
    <img src ="${photographer.portrait} ">
      <h2 class="photographer__name">${photographer.name}</h2>
      <p class="photographer__localisation">${photographer.city}, ${photographer.country}</p>
      <p class="photographer__tagline">${photographer.tagline}</p>
      <p class="photographer__price">${photographer.price} / jour</p>
      <span class="photographer__tags"> #${photographer.tags}</span>
</li>
      `;
  });
}

function displayTagsMenu(tags) {
  let tagsElt = document.querySelector("#tags");
  tags.forEach((tag) => {
    tagsElt.innerHTML += `<span data-tag="${tag}">#${tag}</span>`;
  });
  document.querySelectorAll("#tags span").forEach((span) => {
    span.addEventListener("click", (e) => {
      alert(e.target.dataset.tag);
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
