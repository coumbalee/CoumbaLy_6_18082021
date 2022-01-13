"use strict";
// fonction qui récupère les données du fichier json
export async function fetchData() {
  let response = await fetch("./public/data.json");
  let data = await response.json();
  return data;
}
// fonction qui récupère les photographes du fichier json
export async function getPhotographersFromJson() {
  const data = await fetchData();
  return data.photographers;
}

// fonction qui récupère les médias du fichier json
export async function getMediaFromJson() {
  const data = await fetchData();
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
  return photographerMedias;
}
