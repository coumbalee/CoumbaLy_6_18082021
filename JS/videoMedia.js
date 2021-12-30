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
  }
  displayInList(baseUrl) {
    return imageExist(baseUrl + "/" + this.video)
      ? `
    <li class="media-section__card" data-id="${this.id}">
    <video>
    <source src="${baseUrl}/${this.video}"class="mediaVideo" tabindex="0" alt="vidéo ${this.title}"
    >
    </video>
    <div class ="media-section__content">
    <h2 class ="media-section__title" tabindex="0">${this.title}</h2>
    <div class ="media-section__likes" tabindex="0">
    <p class="media-section__number">${this.likes}</p>
    <i class="fas fa-heart"></i aria-label="button like" role="button" >
    </div>
    </div>
    </li>
    `
      : undefined;
  }
}
