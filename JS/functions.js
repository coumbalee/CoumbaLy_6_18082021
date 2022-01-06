import Image from "./imageMedia.js";
import Video from "./videoMedia.js";
// import { manageListeners } from "./index.js";

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
       <h2 class="photographer-section__name" tabindex="0">${
         photographer.name
       }</h2>
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
    }" class ="photographer-section__img" alt="image du photographe ${
    photographer.name
  }">
    `;
  const contact = document.querySelector("#contact");
  // console.log(contact);
  contact.addEventListener("click", () => generateForm(photographer));
  // manageListeners();
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
  img.alt = "Fisheye logo";
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
  const lightbox = document.querySelector(".lightbox__container");
  const lightboxImgContainer = lightbox.querySelector(
    ".lightbox__img--container"
  );
  const btnPrev = document.querySelector("#btnPrev");
  btnPrev.addEventListener("click", (e) => {
    let oldIndex = parseInt(lightbox.dataset.index);
    let newMedia = navigateInMedias("prev", mediaArray, oldIndex);
    lightbox.dataset.index = newMedia.newIndex;
    if (checkImageOrVideo(lightbox) === "image" && newMedia.media.image) {
      lightboxImgContainer.firstElementChild.src =
        baseUrl + "/" + newMedia.media.image;
      imgTitle = newMedia.media.title;
      lightbox.querySelector("h2").textContent = newMedia.media.title;
      console.log(imgTitle);
    } else if (
      checkImageOrVideo(lightbox) === "image" &&
      newMedia.media.video
    ) {
      //
      // generateLightboxVideo(baseUrl);
      const video = document.createElement("video");
      video.setAttribute("controls", "controls");
      video.classList.add("lightbox__img");
      video.innerHTML += ` <source src="${baseUrl}/${newMedia.media.video}"></source>`;

      lightboxImgContainer.firstElementChild.remove();
      lightboxImgContainer.insertBefore(video, lightboxImgContainer.firstChild);
      imgTitle = newMedia.media.title;
      lightbox.querySelector("h2").textContent = newMedia.media.title;
    } else if (
      checkImageOrVideo(lightbox) === "video" &&
      newMedia.media.image
    ) {
      const img = document.createElement("img");
      img.classList.add("lightbox__img");
      img.src = baseUrl + "/" + newMedia.media.image;

      lightboxImgContainer.firstElementChild.src =
        baseUrl + "/" + newMedia.media.image;

      imgTitle = newMedia.media.title;
      lightbox.querySelector("h2").textContent = newMedia.media.title;
      console.log(imgTitle);
      lightboxImgContainer.firstChild.remove();
      lightboxImgContainer.insertBefore(img, lightboxImgContainer.firstChild);
    } else {
      // generateLightboxVideo(baseUrl);
      const video = document.createElement("video");
      video.setAttribute("controls", "controls");
      video.classList.add("lightbox__img");
      video.innerHTML += ` <source src="${baseUrl}/${newMedia.media.video}"></source>`;

      lightboxImgContainer.firstChild.remove();
      lightboxImgContainer.insertBefore(video, lightboxImgContainer.firstChild);
      imgTitle = newMedia.media.title;
      lightbox.querySelector("h2").textContent = newMedia.media.title;
    }
  });
}
function addListenersToNext(mediaArray, baseUrl, imgTitle) {
  const lightbox = document.querySelector(".lightbox__container");
  const lightboxImgContainer = lightbox.querySelector(
    ".lightbox__img--container"
  );

  const btnNext = document.querySelector("#btnNext");
  btnNext.addEventListener("click", (e) => {
    let oldIndex = parseInt(lightbox.dataset.index);
    let newMedia = navigateInMedias("next", mediaArray, oldIndex);
    lightbox.dataset.index = newMedia.newIndex;
    lightbox.querySelector("h2").textcontent = newMedia.media.title;
    if (checkImageOrVideo(lightbox) === "image" && newMedia.media.image) {
      lightboxImgContainer.firstElementChild.src =
        baseUrl + "/" + newMedia.media.image;

      imgTitle = newMedia.media.title;
      lightbox.querySelector("h2").textContent = newMedia.media.title;

      console.log(imgTitle);
    } else if (
      checkImageOrVideo(lightbox) === "video" &&
      newMedia.media.image
    ) {
      const img = document.createElement("img");
      img.classList.add("lightbox__img");
      img.src = baseUrl + "/" + newMedia.media.image;

      lightboxImgContainer.firstElementChild.src =
        baseUrl + "/" + newMedia.media.image;

      imgTitle = newMedia.media.title;
      lightbox.querySelector("h2").textContent = newMedia.media.title;
      console.log(imgTitle);
      lightboxImgContainer.firstChild.remove();
      lightboxImgContainer.insertBefore(img, lightboxImgContainer.firstChild);
      // console.log(mediaContainer.firstChild);
    } else if (
      checkImageOrVideo(lightbox) === "image" &&
      newMedia.media.video
    ) {
      const video = document.createElement("video");
      video.setAttribute("controls", "controls");
      video.classList.add("lightbox__img");
      video.innerHTML += ` <source src="${baseUrl}/${newMedia.media.video}"></source>`;
      lightboxImgContainer.firstChild.remove();
      lightboxImgContainer.insertBefore(video, lightboxImgContainer.firstChild);
      imgTitle = newMedia.media.title;
      lightbox.querySelector("h2").textContent = newMedia.media.title;
    } else {
      const video = document.createElement("video");
      video.setAttribute("controls", "controls");
      video.classList.add("lightbox__img");
      video.innerHTML += ` <source src="${baseUrl}/${newMedia.media.video}"></source>`;
      lightboxImgContainer.firstChild.remove();
      lightboxImgContainer.insertBefore(video, lightboxImgContainer.firstChild);
      imgTitle = newMedia.media.title;
      lightbox.querySelector("h2").textContent = newMedia.media.title;
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
  const lightboxContainer = document.createElement("div");
  lightboxContainer.classList.add("lightbox__container");

  lightboxContainer.dataset.index = index;
  let imgTitle = mediaArray[index].title;
  mediaBox.append(lightbox);
  // BOUTON CLOSE
  const btnClose = document.createElement("button");
  btnClose.innerHTML += `<i class="fas fa-times " role="button" tabindex="0"></i>`;
  btnClose.classList.add("lightbox__close");
  // BOUTON PREV
  const btnPrev = document.createElement("button");
  btnPrev.id = "btnPrev";
  btnPrev.classList.add("lightbox__prev");
  btnPrev.innerHTML += `<i class="fas fa-chevron-left" role="button" tabindex="0"></i>`;
  // imgContainer
  const imgContainer = document.createElement("div");
  imgContainer.classList.add("lightbox__img--container");

  // BOUTON NEXT
  const btnNext = document.createElement("button");
  btnNext.id = "btnNext";
  btnNext.classList.add("lightbox__next");
  btnNext.innerHTML += `<i class="fas fa-chevron-right" role="button" tabindex="0"></i>`;
  lightboxContainer.prepend(btnClose, btnPrev, imgContainer, btnNext);
  console.log(lightboxContainer);
  lightbox.append(lightboxContainer);

  addListeners(btnClose, btnPrev, btnNext, mediaArray, baseUrl, imgTitle);

  // Check if image or video
  console.log("firstChild", element.firstElementChild);
  if (checkImageOrVideo(element) === "image") {
    console.log("image");

    const img = document.createElement("img");
    img.classList.add("lightbox__img");
    img.src = element.firstElementChild.currentSrc;
    const title = document.createElement("h2");
    title.innerHTML += imgTitle;
    imgContainer.prepend(img, title);
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
    video.classList.add("lightbox__img");
    video.src = element.firstElementChild.currentSrc;
    const title = document.createElement("h2");
    title.innerHTML += imgTitle;
    imgContainer.prepend(video, title);

    document
      .querySelector(".lightbox__close")
      .addEventListener("click", function () {
        removeLightbox();
      });
  }
  focusOnlightbox();
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
    <i class="fas fa-times  form__close" role="button" tabindex="0"></i></span>
    <div class="form__modal-body">
      <form name="form__contact"  action="photographer.html" method="get">
     <h1 class="form__head">Contactez-moi ${photographer.name} </h1>
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
      rows="8" required="" aria-required="true" placeholder="Bonjour..."></textarea><br/>
      <small> Message d'erreur</small>
      </div> 
    </div>
  </div>
  <button class="form__button" type="submit">Envoyer</button>
        `;
  console.log(photographer.name);
  focusOnForm();

  document.querySelector(".form button").addEventListener(
    "click",
    function (event) {
      checkInputs();

      event.preventDefault();
    },
    false
  );
  document.querySelector(".form__close").addEventListener("click", function () {
    removeModal();
  });
}

// Vérification des champs du formulaire
export function checkInputs() {
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
  if (!areaValue) {
    setErrorForArea(area, "Veuillez saisir votre message");
    isValid = false;
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
export function removeModal() {
  const modal = document.querySelector(".form-section");
  modal.remove();
}
export function generateDropdownMenu() {
  const section = document.querySelector(".media-filter-section");

  section.innerHTML += `
  <div class="custom-select">
  <label class="filter-dropdown__label">Trier par : </label> 
   <select class="filter-dropdown__select" role="button" tabindex="0">
      <option  class="filter-dropdown__option"value="1" role="option" data-filter="popularite"  aria-selected="true"tabindex="0">Popularité</option>
      <option class="filter-dropdown__option"value="2" role="option" data-filter="date" aria-selected="true" tabindex="0">Date</option>
      <option class="filter-dropdown__option"value="3" role="option" data-filter="titre" aria-selected="true" tabindex="0">Titre</option>
    </select>
  </div>`;
  let x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  x.tabIndex = 0;
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");

    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    a.tabIndex = 0;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    // dans l' exemple, c'était  for (j = 1; j < ll; j++)
    for (j = 0; j < ll; j++) {
      /* For each option in the original select element,
    create a new DIV that will act as an option item: */
      console.log(selElmnt.options[j].innerHTML, a.textContent);
      c = document.createElement("DIV");
      // adding data-filter to options
      c.setAttribute("data-filter", selElmnt.options[j].innerHTML);
      c.setAttribute("class", "filter-dropdown__option");
      if (j == 0) {
        c.classList.add("same-as-selected");
      }
      c.tabIndex = 0;
      c.setAttribute("aria-selected", "true");
      c.setAttribute("role", "option");

      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        console.log(this);
        /* When an item is clicked, update the original select box,
          and the selected item: */
        let y, i, k, s, h, sl, yl;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        sl = s.length;
        h = this.parentNode.previousSibling;
        for (i = 0; i < sl; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            yl = y.length;
            for (k = 0; k < yl; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }
  focusOnDropdown();
}

export function addListenersToDropDown(medias, baseUrl) {
  let elt = document.querySelector(".select-items");
  console.log(elt);
  elt.addEventListener("click", (e) => {
    e.preventDefault();
    const orderedMedias = sortMediasBy(medias, e.target.dataset.filter);
    console.log(e.target.dataset.filter);

    displayMediasList(orderedMedias, baseUrl);
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
    case "Titre":
      medias.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
      console.log(medias);
      break;
    case "Date":
      medias.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      break;
    case "Popularité":
      medias.sort(function (a, b) {
        return b.likes - a.likes;
      });

    default:
      break;
  }
  return medias;
}

export function incrementLikes(photographer) {
  const mediaHeart = document.querySelectorAll(".media-section__likes");

  mediaHeart.forEach((heart) => {
    console.log(heart);
    heart.addEventListener("click", function (e) {
      e.stopPropagation();
      console.log(e.target);
      const totalLikeElt = document.querySelector("#totalLikes");
      const elt = e.target.classList.contains("media-section__number")
        ? e.target
        : e.target.parentElement.firstElementChild;
      console.log(elt);
      if (elt.classList.contains("liked")) {
        elt.textContent = parseInt(elt.textContent) - 1;
        totalLikeElt.textContent = parseInt(totalLikeElt.textContent) - 1;
      } else {
        elt.textContent = parseInt(elt.textContent) + 1;
        totalLikeElt.textContent = parseInt(totalLikeElt.textContent) + 1;
      }
      elt.classList.toggle("liked");
    });
  });
}

export function showPrice(photographer) {
  const price = document.querySelector("#price");
  console.log(price);
  price.innerHTML = `${photographer.price} / jour`;
}
function focusOnForm() {
  const focusableElements =
    ' input, textarea, button,[tabindex]:not([tabindex="-1"])';
  const modal = document.querySelector(".form");
  console.log(modal);

  const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
  console.log(firstFocusableElement);
  const focusableContent = modal.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

  document.addEventListener("keydown", function (e) {
    let isTabPressed = e.key === "Tab" || e.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  });

  firstFocusableElement.focus();
}
function focusOnlightbox() {
  const focusableElements = 'button,[tabindex]:not([tabindex="-1"])';
  const modal = document.querySelector(".lightbox__container");

  const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
  console.log(firstFocusableElement);
  const focusableContent = modal.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

  document.addEventListener("keydown", function (e) {
    let isTabPressed = e.key === "Tab" || e.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  });

  firstFocusableElement.focus();
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/* If the user clicks anywhere outside the select box,
then close all select boxes: */
document.addEventListener("click", closeAllSelect);
// FOCUS DROPDOWN
function focusOnDropdown() {
  const focusableElements = 'div,option,div[tabindex]:not([tabindex="-1"])';
  const modal = document.querySelector("select");

  const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
  console.log(firstFocusableElement);
  const focusableContent = modal.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

  document.addEventListener("keydown", function (e) {
    let isTabPressed = e.key === "Tab" || e.keyCode === 9;

    if (!isTabPressed) {
      return;
    }

    if (e.shiftKey) {
      // if shift key pressed for shift + tab combination
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus(); // add focus for the last focusable element
        e.preventDefault();
      }
    } else {
      // if tab key is pressed
      if (document.activeElement === lastFocusableElement) {
        // if focused has reached to last focusable element then focus first focusable element after pressing tab
        firstFocusableElement.focus(); // add focus for the first focusable element
        e.preventDefault();
      }
    }
  });

  firstFocusableElement.focus();
}
