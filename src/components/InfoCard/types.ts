type BackgroundPositionProps = 'bottom' | 'center' | 'inherit' | 'initial' | 'left' | 'revert' | 'right' | 'top' | 'unset'

export interface InfoCardProps {
  cardId?: number;
  imageUrl?: string;
  title?: string;
  favorite?: boolean;
  url?: string;
  showFavoriteIcon?: boolean;
  backgroundPosition?: BackgroundPositionProps;
  onFavoriteChange?: (newValue: boolean, CardId?: number) => void;
  onClick?: (CardId?: number) => void;
}

export interface CardImageProps {
  imageUrl?: string;
  backgroundPosition?: BackgroundPositionProps;
}