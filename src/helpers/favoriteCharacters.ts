import { CharacterProps } from "src/models/character";

const favoriteCharacters = ():CharacterProps[] => {
  const currentFavorites: CharacterProps[] = JSON.parse(localStorage.getItem('favoritesList') ?? "[]");
  return currentFavorites;
}

export default favoriteCharacters;