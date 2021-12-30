"use strict";
// fonction qui récupère les données du fichier json
export async function fetchData() {
  let response = await fetch("./../public/data.json");
  let data = await response.json();
  console.log(data);
  return data;
}
// fonction qui récupère les photographes du fichier json
export async function getPhotographersFromJson() {
  const data = await fetchData();
  console.log(data.photographers);
  return data.photographers;
}

console.log(getPhotographersFromJson);

// fonction qui récupère les médias du fichier json
export async function getMediaFromJson() {
  const data = await fetchData();
  console.log(data.media);
  return data.media;
}
// fonction qui récupère les tags des photographes
export function getAllTagsFromPhotographers(photographers) {
  let allTags = [];
  for (const photographer of photographers) {
    allTags = allTags.concat(photographer.tags);
  }
  const tagsSet = new Set(allTags);
  const tags = [...tagsSet];
  return tags;
}
// fonction qui récupère les médias de chaque photographe grace à son id
export async function getMediaFromPhotographer(id) {
  const media = await getMediaFromJson();
  const photographerMedias = media.filter((elt) => elt.photographerId === id);
  console.log(photographerMedias);
  return photographerMedias;
}

// 1 Pour chaque photographe, je dois récupérer les likes de toutes ses photos
// en utilisant son id
// 2 j'utilise la méthode reduce pour avoir le total de likes de ses photos
// 3 j'incrémente ou je décrémente le tableau des likes dans la fonction incrementLikes
// 4 j' affiche le résultat avec la fonction generateInformations)

export async function getAllLikesFromPhotographer() {
  const media = await getMediaFromPhotographer();
  // à ce stade, j'ai récupérer les médias et je veux récupérer seulement les likes
  // let allLikes = [];
  // for (const like of likes) {
  //   allLikes = allLikes.push(media.likes);
}
// logique pour récupérer le prix de chaque photographe
