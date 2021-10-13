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
// fonction asynchrone qui gere l' affichage de la page
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
      <li class="media-section__card"  >
      <img src="${url}"  class="mediaImg" >
      <div class ="media-section__content">
      <h2 class ="media-section__title">${media.title}</h2>
      
      <div class ="media-section__likes">
      <p class="media-section__number">${media.likes}</p>
      <i class="fas fa-heart"></i>
      </div>
      </div>
      </li>
      
      `;
    }

    if (imageExist(video)) {
      cardList.innerHTML += `
      <li class="media-section__card">
      <video controls >
      <source src="${video}"  class="mediaVideo"
      >
      </video>
      <div class ="media-section__content">
      <h2 class ="media-section__title">${media.title}</h2>
      <div class ="media-section__likes">
      <p class="media-section__number">${media.likes}</p>
      <i class="fas fa-heart"></i>
      </div>
      </div>
      </li>
      `;
    }
  });
  displayLightbox();
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

// affichage de la lightbox au click sur l' image
function displayLightbox() {
  const mediaImages = document.querySelectorAll(".mediaImg", ".mediaVideo");
  mediaImages.forEach((mediaImg) => {
    mediaImg.addEventListener("click", (e) => {
      //  création de la div class lighbox et de tous les éléments qu' elle contient
      let mediaBox = document.querySelector(".media-section");
      const lightbox = document.createElement("div");
      lightbox.classList.add("lightbox");
      mediaBox.append(lightbox);
      const btnClose = document.createElement("button");
      btnClose.innerHTML += `<i class="fas fa-times  lightbox__close"></i>`;
      const btnPrev = document.createElement("button");
      btnPrev.innerHTML += `<i class="fas fa-chevron-left  lightbox__prev"></i>`;
      // button class next
      const btnNext = document.createElement("button");
      btnNext.innerHTML += `<i class="fas fa-chevron-right  lightbox__next"></i>`;
      // div class lightbox container
      const lightboxContainer = document.createElement("div");
      lightboxContainer.classList.add("lightbox__container");
      // cration de l' image contenu dans le container
      const img = document.createElement("img");
      // la source de l' image crée sera la même que celle sur laquelle on aura cliqué
      img.src = mediaImg.currentSrc;
      lightboxContainer.prepend(img);
      lightbox.prepend(btnClose, btnPrev, btnNext, lightboxContainer);
      // fermeture de la lightbox au clic sur le bouton x
      document
        .querySelector(".lightbox__close")
        .addEventListener("click", function () {
          removeLightbox();
        });
    });
  });
}

function removeLightbox() {
  const removeLightbox = document.querySelector(".lightbox");
  removeLightbox.remove();
}
