import AsyncStorage from "@react-native-async-storage/async-storage";

// Buscar Links
export async function getLinksSave(key) {
  const myLinks = await AsyncStorage.getItem(key);
  let linkSaves = JSON.parse(myLinks) || [];

  return linkSaves;
}

// Salvar link no storage
export async function saveLink(key, newLink) {
  let linksStored = await getLinksSave(key);

  // Se tiver algum link salvo com esse mesmo ID / ou duplicado preciso ignorar
  const hasLink = linksStored.some((link) => link.id === newLink.id);
  if (hasLink) {
    alert("Este link foi cadastrado");
    return;
  }

  linksStored.push(newLink);

  await AsyncStorage.setItem(key, JSON.stringify(linksStored));
}

// Deletar links
export async function deleteLink(links, id, key) {
  let myLinks = links.filter((item) => item.id !== id);
  await AsyncStorage.setItem(key, JSON.stringify(myLinks));

  return myLinks;
}
