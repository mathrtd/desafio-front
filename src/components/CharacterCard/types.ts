export interface CharacterCardProps {
  characterId?: number;
  imageUrl?: string;
  title?: string;
  favorite?: boolean;
  url?: string;
  onFavoriteChange?: (newValue: boolean, characterId?: number) => void;
  onClick?: (characterId?: number) => void;
}

export interface CharacterImageProps {
  imageUrl?: string;
}