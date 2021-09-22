"use strict";
import {
  getPhotographersFromJson,
  getAllTagsFromPhotographers,
} from "./dataFunction.js";

generateHeader();
displayPage();
console.log("on continue le chargement de la page");

function showPhotographers(photographers) {
  let photographersElt = document.querySelector("#photographers");
  photographersElt.innerHTML = "";
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
    span.addEventListener("click", (e) => {});
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

function manageListeners(tags, photographers) {
  tags.forEach((tag) => {
    tag.addEventListener("click", (e) => {
      //quand je clique sur le tag, je récupère la valeur du tag
      console.log(tag.dataset.tag);
      let filteredPhotographers = photographers.filter((elt) =>
        elt.tags.includes(tag.dataset.tag)
      );
      console.log(filteredPhotographers);
      showPhotographers(filteredPhotographers);
      let photographersElt = document.querySelector("#photographers");
      let tagsElts = photographersElt.querySelectorAll(".tag");
      manageListeners(tagsElts, photographers);
    });
  });
}

async function displayPage() {
  console.log("lance display page");
  const photographers = await getPhotographersFromJson();
  console.log("Photographes recuperes");
  console.log(photographers);
  const tags = getAllTagsFromPhotographers(photographers);
  console.log(tags);
  displayTagsMenu(tags);
  showPhotographers(photographers);
  // Recuperer TOUS les tags qui ont la class tag
  const tagsElts = document.querySelectorAll(".tag");
  console.log(tagsElts);
  // Ajouter un eventListener sur chacun des tag
  manageListeners(tagsElts, photographers);
}
