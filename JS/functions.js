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
    <button class="photographer-section__button" id="contact" >Contactez moi</button>
    
    <img src ="./IMAGES/Photographers%20ID%20Photos/${
      photographer.portrait
    }" class ="photographer-section__img">
    `;
  const contact = document.querySelector("#contact");
  // console.log(contact);
  contact.addEventListener("click", generateForm);
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
// fonction qui récupère l' id d'un photographe à partir de  l' url
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
export function displayLightbox(mediaArray, baseUrl) {
  const mediaElts = document.querySelectorAll(".media-section__card");
  mediaElts.forEach((element, index) => {
    element.addEventListener("click", (e) => {
      let imgTitle = mediaArray[index].title;
      generateLightbox(index, mediaArray, baseUrl, element);
    });
  });
}
function addListenersToPrev(mediaArray, baseUrl, imgTitle) {
  const lightbox = document.querySelector(".lightbox");

  const btnPrev = document.querySelector("#btnPrev");
  btnPrev.addEventListener("click", (e) => {
    let oldIndex = parseInt(lightbox.dataset.index);
    let newMedia = navigateInMedias("prev", mediaArray, oldIndex);
    lightbox.dataset.index = newMedia.newIndex;
    let mediaContainer = lightbox.querySelector(".lightbox__container");
    if (checkImageOrVideo(mediaContainer) === "image" && newMedia.media.image) {
      mediaContainer.firstElementChild.src =
        baseUrl + "/" + newMedia.media.image;
      imgTitle = newMedia.media.title;
      mediaContainer.querySelector("h2").textContent = newMedia.media.title;
      console.log(imgTitle);
    } else if (
      checkImageOrVideo(mediaContainer) === "image" &&
      newMedia.media.video
    ) {
      const video = document.createElement("video");
      video.setAttribute("controls", "controls");
      video.classList.add("lightbox-img");
      // generateVideo();
      video.innerHTML += ` <source src="${baseUrl}/${newMedia.media.video}"></source>`;
      mediaContainer.firstElementChild.remove();
      mediaContainer.insertBefore(video, mediaContainer.firstChild);
      imgTitle = newMedia.media.title;
      mediaContainer.querySelector("h2").textContent = newMedia.media.title;
    } else if (
      checkImageOrVideo(mediaContainer) === "video" &&
      newMedia.media.image
    ) {
      const img = document.createElement("img");
      img.classList.add("lightbox-img");
      // generateLightboxImage()
      img.src = baseUrl + "/" + newMedia.media.image;
      mediaContainer.firstElementChild.src =
        baseUrl + "/" + newMedia.media.image;

      imgTitle = newMedia.media.title;
      mediaContainer.querySelector("h2").textContent = newMedia.media.title;
      console.log(imgTitle);
      mediaContainer.firstElementChild.remove();
      mediaContainer.insertBefore(img, mediaContainer.firstChild);
    } else {
      const video = document.createElement("video");
      video.setAttribute("controls", "controls");
      video.classList.add("lightbox-img");
      // generateVideo();
      video.innerHTML += ` <source src="${baseUrl}/${newMedia.media.video}"></source>`;
      mediaContainer.firstElementChild.src =
        baseUrl + "/" + newMedia.media.video;
    }
  });
}
function addListenersToNext(mediaArray, baseUrl, imgTitle) {
  const lightbox = document.querySelector(".lightbox");
  const btnNext = document.querySelector("#btnNext");
  btnNext.addEventListener("click", (e) => {
    let oldIndex = parseInt(lightbox.dataset.index);
    let newMedia = navigateInMedias("next", mediaArray, oldIndex);
    lightbox.dataset.index = newMedia.newIndex;
    let mediaContainer = lightbox.querySelector(".lightbox__container");
    mediaContainer.querySelector("h2").textcontent = newMedia.media.title;

    if (checkImageOrVideo(mediaContainer) === "image" && newMedia.media.image) {
      mediaContainer.firstElementChild.src =
        baseUrl + "/" + newMedia.media.image;

      imgTitle = newMedia.media.title;
      mediaContainer.querySelector("h2").textContent = newMedia.media.title;

      console.log(imgTitle);
    } else if (
      checkImageOrVideo(mediaContainer) === "video" &&
      newMedia.media.image
    ) {
      const img = document.createElement("img");
      img.classList.add("lightbox-img");
      // generateLightboxImage()
      img.src = baseUrl + "/" + newMedia.media.image;
      mediaContainer.firstElementChild.src =
        baseUrl + "/" + newMedia.media.image;

      imgTitle = newMedia.media.title;
      mediaContainer.querySelector("h2").textContent = newMedia.media.title;
      console.log(imgTitle);
      mediaContainer.firstElementChild.remove();
      mediaContainer.insertBefore(img, mediaContainer.firstChild);
    } else if (
      checkImageOrVideo(mediaContainer) === "image" &&
      newMedia.media.video
    ) {
      const video = document.createElement("video");
      video.setAttribute("controls", "controls");
      video.classList.add("lightbox-img");
      // generateVideo();
      video.innerHTML += ` <source src="${baseUrl}/${newMedia.media.video}"></source>`;
      mediaContainer.firstElementChild.remove();
      mediaContainer.insertBefore(video, mediaContainer.firstChild);
      imgTitle = newMedia.media.title;
      mediaContainer.querySelector("h2").textContent = newMedia.media.title;
    } else {
      mediaContainer.firstElementChild.src =
        baseUrl + "/" + newMedia.media.video;
    }
  });
}
function addListeners(
  btnClose,
  btnPrev,
  btnNext,
  mediaArray,
  baseUrl,
  imgTitle
) {
  const lightbox = document.querySelector(".lightbox");
  addListenersToPrev(mediaArray, baseUrl, imgTitle);
  addListenersToNext(mediaArray, baseUrl, imgTitle);
}
function generateLightbox(index, mediaArray, baseUrl, element) {
  let mediaBox = document.querySelector(".media-section");
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");
  lightbox.dataset.index = index;
  let imgTitle = mediaArray[index].title;
  mediaBox.append(lightbox);
  // BOUTON CLOSE
  const btnClose = document.createElement("button");
  btnClose.innerHTML += `<i class="fas fa-times  lightbox__close"></i>`;
  // BOUTON PREV
  const btnPrev = document.createElement("button");
  btnPrev.id = "btnPrev";
  btnPrev.innerHTML += `<i class="fas fa-chevron-left  lightbox__prev"></i>`;
  // BOUTON NEXT
  const btnNext = document.createElement("button");
  btnNext.id = "btnNext";
  btnNext.innerHTML += `<i class="fas fa-chevron-right  lightbox__next"></i>`;
  lightbox.prepend(btnClose, btnPrev, btnNext);
  addListeners(btnClose, btnPrev, btnNext, mediaArray, baseUrl, imgTitle);
  const lightboxContainer = document.createElement("div");
  lightboxContainer.classList.add("lightbox__container");

  // Check if image or video
  console.log("firstChild", element.firstElementChild);
  if (checkImageOrVideo(element) === "image") {
    console.log("image");
    const img = document.createElement("img");
    img.classList.add("lightbox-img");
    // generateLightboxImage()
    img.src = element.firstElementChild.currentSrc;
    lightboxContainer.prepend(img);
    const title = document.createElement("h2");
    lightboxContainer.append(title);
    title.innerHTML += imgTitle;

    lightbox.prepend(lightboxContainer);
    // fermeture de la lightbox au clic sur le bouton x
    document
      .querySelector(".lightbox__close")
      .addEventListener("click", function () {
        removeLightbox();
      });
  } else {
    console.log("video");
    const video = document.createElement("video");
    video.setAttribute("controls", "controls");
    video.classList.add("lightbox-img");
    video.src = element.firstElementChild.currentSrc;
    lightboxContainer.prepend(video);
    const title = document.createElement("h2");
    lightboxContainer.append(title);
    title.innerHTML += imgTitle;
    lightbox.prepend(btnClose, btnPrev, btnNext, lightboxContainer);
    // fermeture de la lightbox au clic sur le bouton x
    document
      .querySelector(".lightbox__close")
      .addEventListener("click", function () {
        removeLightbox();
      });
  }
}
function navigateInMedias(direction, medias, index) {
  let newIndex = 0;
  let factor = direction === "next" ? 1 : -1;
  if (direction === "next" && medias.length - 1 === index) {
    newIndex = 0;
  } else if (direction === "prev" && index === 0) {
    newIndex = medias.length - 1;
  } else {
    newIndex = index + factor;
  }
  return { newIndex, media: medias[newIndex] };
}

// fonction qui ferme la lightbox
export function removeLightbox() {
  const removeLightbox = document.querySelector(".lightbox");
  removeLightbox.remove();
}
function checkImageOrVideo(container) {
  if (container.firstElementChild.nodeName.toLowerCase() === "img") {
    return "image";
  }

  return "video";
}
// fonction qui crée le formulaire de contact
export function generateForm(photographer) {
  const formSection = document.createElement("section");
  const main = document.querySelector("main");
  console.log(main);
  formSection.classList.add("form-section");
  const form = document.createElement("form");
  form.classList.add("form");
  formSection.prepend(form);
  main.append(formSection);
  form.innerHTML += ` 
  <div class="form__content">
    <span >
    <i class="fas fa-times  form__close"></i></span>
    <div class="form__modal-body">
      <form name="form__contact"  action="photographer.html" method="get">
     <h1 class="form__head">Contactez-moi </h1>
        <div class="form__control ">
          <label class ="form__label"for="first">Prénom</label><br />
          <input
            class="form__input"
            type="text"
            id="first"
            name="firstname"
            placeholder="John"
          />
          <br />
          <small> Message d'erreur</small>
        </div>
        <div class="form__control">
          <label class ="form__label" for="last">Nom</label><br />
          <input
            class="form__input"
            type="text"
            id="last"
            name="lastname"
            placeholder="Doe"
          />
          <br />
          <small> Message d'erreur</small
        </div>
        </div>

        <div class="form__control">
        <label class ="form__label" for="email">E-mail</label><br />
        <input
          class="form__input"
          type="email"
          id="email"
          name="email"
          placeholder="johndoe@gmail.com"
        /><br />
        <small> Message d'erreur</small
      </div>
      </div>
      <div class="form__control">
      <label class ="form__label" for="text-area">Votre Message</label><br />
      <textarea  name="text-area" id="textArea" class="form__text-area" cols="20" 
      rows="10" required="" aria-required="true" placeholder="Bonjour..."></textarea><br/>
      <small> Message d'erreur</small>
      </div> 
    </div>
  </div>
  <button class="form__button" type="submit">Envoyer</button>
        `;
  console.log(photographer.name);

  document.querySelector(".form").addEventListener(
    "click",
    function (event) {
      checkInputs();
      event.preventDefault();
    },
    false
  );
  document.querySelector(".form__close").addEventListener("click", function () {
    displayModal();
  });
}

// Vérification des champs du formulaire
export function checkInputs() {
  // console.log(checkInputs());
  const form = document.querySelector(".form");
  console.log(form);
  const firstName = document.querySelector("#first");
  console.log(firstName);
  const lastName = document.querySelector("#last");
  const email = document.querySelector("#email");
  const area = document.querySelector("#textArea");
  let isValid = true;

  const firstNameValue = firstName.value.trim();
  const lastNameValue = lastName.value.trim();
  const emailValue = email.value.trim();
  const areaValue = area.value.trim();

  // Vérification de chaque champ
  if (!firstNameValue) {
    setErrorFor(firstName, "Veuillez saisir votre prénom ");
    isValid = false;
    // console.log(isValid);
  } else if (firstNameValue.length < 2) {
    setErrorFor(
      firstName,
      "Veuillez saisir au moins 2 lettres pour votre prénom "
    );
    isValid = false;
  } else {
    setSuccessFor(firstName);
    console.log(isValid);
  }
  if (!lastNameValue) {
    setErrorFor(lastName, "Veuillez saisir votre nom");
    isValid = false;
  } else if (lastNameValue.length < 2) {
    setErrorFor(lastName, "Veuillez saisir au moins 2 lettres pour votre nom ");
    isValid = false;
  } else {
    setSuccessFor(lastName);
    console.log(isValid);
  }
  if (!emailValue) {
    setErrorFor(email, "Veuillez saisir votre email");
    isValid = false;
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "Cet email n' est pas valide");
    isValid = false;
  } else {
    setSuccessFor(email);
    console.log(isValid);
  }
  // adapter ou créer une fonction en plus pour area
  if (!areaValue) {
    setErrorForArea(area, "Veuillez saisir votre message");
    isValid = false;
    // console.log(isValid);
  } else {
    setSuccessForArea(area);
    console.log(isValid);
  }
  if (isValid) {
    const removeForm = document.querySelector(".form");
    removeForm.remove();
  }
}

// Fonction regex  pour l'email
export function isEmail(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}
export function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = "form__control success";
  console.log(input.getAttribute("name"), " : ", input.value);
}
export function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  formControl.className = "form__control error";
  small.innerText = message;
  console.log(input.getAttribute("name"), " : ", input.value);
}
export function setErrorForArea(textarea, message) {
  const areaControl = textarea.parentElement;
  const small = areaControl.querySelector("small");
  areaControl.className = "form__control error";
  small.innerText = message;
}
export function setSuccessForArea(textarea) {
  const areaControl = textarea.parentElement;
  areaControl.className = "form__control success";
  console.log(textarea.getAttribute("name"), " : ", textarea.value);
}
export function displayModal() {
  const modal = document.querySelector(".form");
  modal.remove();
}
export function generateDropdownMenu() {
  const section = document.querySelector(".media-filter-section");

  section.innerHTML += `
  <div class="filter-dropdown">
    <p class="filter-dropdown__label">Trier par</p> 
    <ul id="dropdownContent" class="filter-dropdown__content">
      <li><a href="#" class="filter-dropdown__option" data-filter="popularite">Popularité </a><span class="filter-dropdown__arrow">
      <i class="fas fa-chevron-down" id="dropdownBtn"></i></span></li>
      <li><a href="#" class="filter-dropdown__option" data-filter="date">Date</a></li>
      <li><a href="#" class="filter-dropdown__option" data-filter="titre">Titre</a></li>
    </ul>
  </div>`;
  const dropdownBtn = document.querySelector("#dropdownBtn");
  dropdownBtn.addEventListener("click", openDropdown);
}
function openDropdown() {
  document.getElementById("dropdownContent").classList.toggle("show");
}
export function addListenersToDropDown(medias, baseUrl) {
  document.querySelectorAll(".filter-dropdown__option").forEach((elt) => {
    elt.addEventListener("click", (e) => {
      e.preventDefault();
      console.log(e.target.dataset.filter);
      const orderedMedias = sortMediasBy(medias, e.target.dataset.filter);
      displayMediasList(orderedMedias, baseUrl);
    });
  });
}

export function displayMediasList(photographerMedias, baseUrl) {
  const cardList = document.querySelector(".media-section__cards");
  cardList.innerHTML = "";

  photographerMedias.forEach((elt) => {
    let media = factory(elt);

    if (media !== undefined && media.displayInList(baseUrl) !== undefined) {
      cardList.innerHTML += media.displayInList(baseUrl);
    }
  });
  displayLightbox(photographerMedias, baseUrl);
}

function sortMediasBy(medias, filter) {
  //on veut trier les medias
  switch (filter) {
    case "titre":
      medias.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
      console.log(medias);
      break;
    case "date":
      medias.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      break;
    case "popularite":
      medias.sort(function (a, b) {
        return b.likes - a.likes;
      });

    default:
      break;
  }
  return medias;
}
