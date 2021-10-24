import Image from "./imageMedia.js";
import Video from "./videoMedia.js";

export function factory(media) {
  if (media.image) {
    return new Image(media);
  } else if (media.video) {
    return new Video(media);
  }
  return undefined;
}

// Fonction qui affiche les informations d'un photographe
export function displayPhotographerInformation(photographer) {
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
// // Fonction qui génère le logo du header
export function generateHeader() {
  const header = document.querySelector(".header-photographer");
  const headerLink = document.createElement("a");
  headerLink.href = "./index.html";
  headerLink.classList.add(".header-photographer__link");
  header.appendChild(headerLink);
  const img = document.createElement("img");
  img.src = "/IMAGES/logo.png";
  headerLink.appendChild(img);
}
export function getPhotographerIdFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}
export function imageExist(url) {
  if (url) {
    var req = new XMLHttpRequest();
    req.open("GET", url, false);
    req.send();
    if (req.status == 200) {
      return true;
    } else {
      console.warn(`l'url suivante n'est pas presente sur le serveur : ${url}`);
      return false;
    }
  }
}
// affichage de la lightbox au click sur l' image
export function displayLightbox(mediaArray, baseUrl) {
  const mediaImages = document.querySelectorAll(".mediaImg");
  mediaImages.forEach((mediaImg, index) => {
    mediaImg.addEventListener("click", (e) => {
      //  création de la div class lighbox et de tous les éléments qu' elle contient
      let mediaBox = document.querySelector(".media-section");
      const lightbox = document.createElement("div");
      lightbox.classList.add("lightbox");
      lightbox.dataset.index = index;
      let imgTitle = mediaArray[index].title;
      mediaBox.append(lightbox);
      const btnClose = document.createElement("button");
      btnClose.innerHTML += `<i class="fas fa-times  lightbox__close"></i>`;
      const btnPrev = document.createElement("button");
      btnPrev.innerHTML += `<i class="fas fa-chevron-left  lightbox__prev"></i>`;

      btnPrev.addEventListener("click", (e) => {
        const oldIndex = lightbox.dataset.index;
        let newIndex = oldIndex == 0 ? mediaArray.length - 1 : oldIndex - 1;
        console.log(mediaArray[newIndex]);

        lightbox.dataset.index = newIndex;

        let image = lightbox.querySelector(".lightbox-img");

        image.src = mediaArray[newIndex].image
          ? baseUrl + "/" + mediaArray[newIndex].image
          : baseUrl + "/" + mediaArray[newIndex].video;
        // console.log(mediaArray[oldIndex].title);
      });
      const btnNext = document.createElement("button");
      btnNext.innerHTML += `<i class="fas fa-chevron-right  lightbox__next"></i>`;

      btnNext.addEventListener("click", (e) => {
        const oldIndex = lightbox.dataset.index;
        // fonctionne  à moitié
        // let newIndex = oldIndex == 0 ? mediaArray.length - 1 : oldIndex + 1;
        let newIndex = oldIndex == 0 ? oldIndex++ : oldIndex++;

        console.log(mediaArray[newIndex]);

        lightbox.dataset.index = newIndex;

        let image = lightbox.querySelector(".lightbox-img");

        image.src = mediaArray[newIndex].image
          ? baseUrl + "/" + mediaArray[newIndex].image
          : baseUrl + "/" + mediaArray[newIndex].video;
      });
      const lightboxContainer = document.createElement("div");
      lightboxContainer.classList.add("lightbox__container");
      // cration de l' image contenu dans le container
      const img = document.createElement("img");
      img.classList.add("lightbox-img");
      // la source de l' image crée sera la même que celle sur laquelle on aura cliqué
      img.src = mediaImg.currentSrc;
      console.log(mediaImg);
      lightboxContainer.prepend(img);
      // Ajout du titre de l' image dans la lightbox
      // lightbox.dataset.title = title;
      const title = document.createElement("h2");
      // title.innerHTML += mediaArray[oldIndex].title;

      // title.innerHTML += b;
      lightboxContainer.append(title);
      title.innerHTML += imgTitle;

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

export function removeLightbox() {
  const removeLightbox = document.querySelector(".lightbox");
  removeLightbox.remove();
}
