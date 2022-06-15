import React, { useState } from 'react'
import { CharacterCardWrapper, CharacterImage, CharacterInfo } from './styles';
import { CharacterCardProps } from './types';
import favIconPath from 'src/assets/favorito_01.svg';
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
        <img src={favIconPath}/>
      </CharacterInfo>
    </CharacterCardWrapper>
  )
}

export default CharacterCard;
