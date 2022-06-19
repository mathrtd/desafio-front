import { CharacterProps } from "src/models/character";

const updateFavoriteCharacters = (newValue: boolean, character?: CharacterProps) => {
  if (!character) throw new Error('personagem invalido');

  // update local storage list
  let currentFavorites: CharacterProps[] = JSON.parse(localStorage.getItem('favoritesList') ?? "[]");
  if (newValue) {
    if (currentFavorites.length >= 5) throw new Error('limite de favoritos atingido');
    currentFavorites.push(character);
  } else {
    const index = currentFavorites.map((character) => character.id).indexOf(character.id, 0);
    if (index > -1) {
      currentFavorites.splice(index, 1);
    }
  }
  localStorage.setItem('favoritesList', JSON.stringify(currentFavorites));
}

export default updateFavoriteCharacters;