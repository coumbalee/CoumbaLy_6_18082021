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
