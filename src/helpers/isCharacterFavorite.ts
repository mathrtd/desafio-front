import { CharacterProps } from "src/models/character";

const isCharacterFavorite = (characterId?: number): boolean => {
  let currentFavorites: CharacterProps[] = JSON.parse(localStorage.getItem('favoritesList') ?? "[]");
  return !!currentFavorites.find((character) => character.id === characterId);
}

export default isCharacterFavorite;