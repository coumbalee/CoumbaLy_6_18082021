import { imageExist } from "./functions.js";
export default class videoMedia {
  constructor(media) {
    this.id = media.id;
    this.photographerId = media.photographerId;
    this.title = media.title;
    this.video = media.video;
    this.tags = media.tags;
    this.likes = media.likes;
    this.date = media.date;
    this.price = media.price;
    this.altText = media.altText;
  }
  displayInList(baseUrl) {
    return imageExist(baseUrl + "/" + this.video)
      ? `
    <li class="media-section__card" data-id="${this.id}">
    <video tabindex="0" title="${this.altText}">
    <source src="${baseUrl}/${this.video}"   class="mediaVideo"  
    >
    </video>
    <div class ="media-section__content">
    <h2 class ="media-section__title" tabindex="0">${this.title}</h2>
    <div class ="media-section__likes" tabindex="0">
    <p class="media-section__number">${this.likes}</p>
    <span class="fas fa-heart" role="button" aria-label="bouton j'aime"></span>
    </div>
    </div>
    </li>
    `
      : undefined;
  }
}
