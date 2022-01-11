import { imageExist } from "./functions.js";
export default class imageMedia {
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.image = media.image;
    this.tags = media.tags;
    this.likes = media.likes;
    this.date = media.date;
    this.price = media.price;
    this.altText = media.altText;
  }
  displayInList(baseUrl) {
    return imageExist(baseUrl + "/" + this.image)
      ? `
    <li class="media-section__card" data-id="${this.id}" >
    <img src="${baseUrl}/${this.image}"  class="mediaImg" tabindex="0" alt="${this.altText}">
    <div class ="media-section__content">
    <h2 class ="media-section__title " tabindex="0">${this.title} </h2>
    <div class ="media-section__likes" tabindex="0">
    <p class="media-section__number">${this.likes}</p>
    <span class="fas fa-heart media-section__heart" aria-label="bouton j'aime" role="button" ></span>
    </div>
    </div>
    </li>
    `
      : undefined;
  }
}
