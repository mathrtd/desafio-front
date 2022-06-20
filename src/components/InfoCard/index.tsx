import React, { useState } from 'react'
import { InfoCardWrapper, CardImage, CardInfo, FavoriteIconWrapper } from './styles';
import { InfoCardProps } from './types';
import favIconPath from 'src/assets/favorito_01.svg';
import favIconOutlinePath from 'src/assets/favorito_02.svg';
import favIconHoverPath from 'src/assets/favorito_03.svg';
import logoPath from 'src/assets/marvel_logo.svg';

const InfoCard: React.FC<InfoCardProps> = ({ ...props }) => {
  const [localImageUrl, setLocalImageUrl] = useState<string>(logoPath)
  const imageLoader = new Image();
  imageLoader.src = props.imageUrl ?? '';

  // lazy load
  imageLoader.onload = () => {
    setLocalImageUrl(props.imageUrl ?? '');
  };

  return (
    <InfoCardWrapper
      onClick={props.onClick ? (() => props.onClick?.(props.cardId)) : undefined}
    >
      <CardImage
        imageUrl={localImageUrl}
        backgroundPosition={props.backgroundPosition}
      />
      <CardInfo>
        <p>{props.title}</p>
        {
          props.showFavoriteIcon
            ? <FavoriteIconWrapper
                onClick={(event) => {
                  event.stopPropagation()
                  props.onFavoriteChange?.(!props.favorite ?? false, props.cardId)
                }}
              >
                <img alt="favorite icon" className="default-favorite-icon" src={props.favorite ? favIconPath : favIconOutlinePath} />
                <img alt="favorite icon" className="hover-favorite-icon" src={favIconHoverPath} />
              </FavoriteIconWrapper>
            : null
        }

      </CardInfo>
    </InfoCardWrapper>
  )
}

export default InfoCard;
