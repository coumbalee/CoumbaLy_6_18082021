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
  const header = document.querySelector(".header-photographer");
  const headerLink = document.createElement("a");
  headerLink.href = "./index.html";
  headerLink.classList.add(".header-photographer__link");
  header.appendChild(headerLink);
  const img = document.createElement("img");
  img.src = "/IMAGES/logo.png";
  headerLink.appendChild(img);
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
    <button class="photographer-section__button">Contactez moi</button>
    
    <img src ="./IMAGES/Photographers%20ID%20Photos/${
      photographer.portrait
    }" class ="photographer-section__img">
    `;
}

async function displayPhotographerPage() {
  // PHOTOGRAPHES
  const photographers = await getPhotographersFromJson();
  console.log(photographers);
  const queryString = window.location.search;
  console.log(queryString);
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get("id");
  console.log(id);
  const photographer = photographers.find((elt) => elt.id === parseInt(id, 10));
  const photographerSurname = getSurname(photographer.name);
  console.log(photographerSurname);
  displayPhotographerInformation(photographer);

  // MEDIAS
  const media = await getMediaFromJson();
  console.log(media);
  const photographerMedias = media.filter(
    (elt) => elt.photographerId === parseInt(id, 10)
  );
  console.log(photographerMedias);
  generateLighbox();

  // créer ici une ul
  let mediaElt = document.querySelector(".media-section");
  const cardList = document.createElement("ul");
  cardList.classList.add("media-section__cards");
  mediaElt.append(cardList);

  console.log(mediaElt);
  photographerMedias.forEach((media) => {
    let url = `./IMAGES/${photographerSurname}/${media.image} `;
    let video = ` ./IMAGES/${photographerSurname}/${media.video} `;
    if (imageExist(url)) {
      cardList.innerHTML += `
    <li class="media-section__card">
    <img src="${url}" data-img="${url}" >
    <div class ="media__content">
    <h2 class ="media__title">${media.title}</h2>
    </div>

    <div class ="media__likes">
    <p class="media__likes-number">${media.likes}</p>
    <i class="fas fa-heart"></i>
    </li>

    `;
    }

    if (imageExist(video)) {
      cardList.innerHTML += `
    <li class="media-section__card">
    <video controls >
    <source src="${video}" data-video="${video}" 
            >
    </video>

    <div class ="media__content">
    <h2 class ="media__title">${media.title}</h2>
    </div>

    <div class ="media__likes">
    <p class="media__likes-number">${media.likes}</p>
    <i class="fas fa-heart"></i>
    </li>

    `;
    }
  });
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
function imageExist(url) {
  if (url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send();
    return req.status == 200;
  } else {
    return false;
  }
}

// création  de la lightbox
function generateLighbox() {
  // / div class lighbox
  let mediaBox = document.querySelector(".media-section");
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  mediaBox.append(lightbox);
  // button class close
  const btnClose = document.createElement("button");
  btnClose.classList.add("close");
  // button class prev
  const btnPrev = document.createElement("button");
  btnPrev.classList.add("prev");
  // button class next
  const btnNext = document.createElement("button");
  btnNext.classList.add("next");
  // div class lightbox container
  const lightboxContainer = document.createElement("div");
  lightboxContainer.classList.add("lightbox__container");

  lightbox.prepend(btnClose, btnPrev, btnNext, lightboxContainer);
}

// fonction qui affiche la lightbox grace a un evenement
function displayLightbox(image) {
  let images = `./IMAGES/${photographerSurname}/${media.image} `;
  let video = ` ./IMAGES/${photographerSurname}/${media.video} `;
  images.forEach((image) => image.addEventListener("click", (e) => {}));
}
