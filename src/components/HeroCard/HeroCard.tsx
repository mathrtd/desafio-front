import React from 'react'
import { HeroCardWrapper, HeroImage, HeroInfo } from './styles';
import { HeroCardProps } from './types';
import favIconPath from 'src/assets/favorito_01.svg';

const HeroCard: React.FC<HeroCardProps> = ({...props}) => {
  return (
    <HeroCardWrapper>
      <HeroImage
        imageUrl={props.imageUrl}
      />
      <HeroInfo>
        <p>texto texto texto texto texto texto</p>
        <img src={favIconPath}/>
      </HeroInfo>
    </HeroCardWrapper>
  )
}

export default HeroCard;
