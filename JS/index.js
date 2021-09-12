"use strict";
import {
  fetchData,
  getPhotographersFromJson,
  getAllTagsFromPhotographers,
  getMediaFromJson,
} from "./dataFunction.js";

getPhotographersFromJson().then((photographers) => {
  const tags = getAllTagsFromPhotographers(photographers);
  console.log(tags);
  let tagsElt = document.querySelector("#tags");
  tags.forEach((tag) => {
    tagsElt.innerHTML += `<span data-tag="${tag}">#${tag}</span>`;
  });
  document.querySelectorAll("#tags span").forEach((span) => {
    span.addEventListener("click", (e) => {
      alert(e.target.dataset.tag);
    });
  });
});

// création du lien du haut du header
const headerLinkTop = document.querySelector(".header");
headerLinkTop.querySelector(".header__link--top").innerHTML =
  "Passer au contenu";

// création du lien 'nos photographes' du header
const headerLinkRight = document.querySelector(".header");
headerLinkRight.querySelector(".header__link--right").innerHTML =
  "Nos photographes";

// insertion du logo
const img = document.createElement("img");
img.src = "/IMAGES/logo.png";
document.querySelector(".header__logo").appendChild(img);
