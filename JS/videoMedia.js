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
    <li class="media-section__card">
    <video controls >
    <source src="${baseUrl}/ ${this.video}"  class="mediaVideo"
    >
    </video>
    <div class ="media-section__content">
    <h2 class ="media-section__title">${this.title}</h2>
    <div class ="media-section__likes">
    <p class="media-section__number">${this.likes}</p>
    <i class="fas fa-heart"></i>
    </div>
    </div>
    </li>
    `
      : undefined;
  }
}
