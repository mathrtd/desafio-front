import React, { useState } from 'react'
import { CharacterCardWrapper, CharacterImage, CharacterInfo, FavoriteIconWrapper } from './styles';
import { CharacterCardProps } from './types';
import favIconPath from 'src/assets/favorito_01.svg';
import favIconOutlinePath from 'src/assets/favorito_02.svg';
import favIconHoverPath from 'src/assets/favorito_03.svg';
import logoPath from 'src/assets/marvel_logo.svg';

const CharacterCard: React.FC<CharacterCardProps> = ({...props}) => {
  const [localImageUrl, setLocalImageUrl] = useState<string>(logoPath)
  const imageLoader = new Image();
  imageLoader.src = props.imageUrl ?? '';

  // lazy load
  imageLoader.onload = () => {
    setLocalImageUrl(props.imageUrl ?? '');
  };

  return (
    <CharacterCardWrapper>
      <CharacterImage
        imageUrl={localImageUrl}
      />
      <CharacterInfo>
        <p>{props.title}</p>
        <FavoriteIconWrapper
          onClick={(_) => props.onFavoriteChange?.(!props.favorite ?? false, props.characterId)}
        >
          <img className="default-favorite-icon" src={props.favorite ? favIconPath : favIconOutlinePath}/>
          <img className="hover-favorite-icon" src={favIconHoverPath}/>
        </FavoriteIconWrapper>
      </CharacterInfo>
    </CharacterCardWrapper>
  )
}

export default CharacterCard;
