import styled from 'styled-components';
import { CardImageProps } from './types';

export const InfoCardWrapper = styled.div<CardImageProps>`
  transition: 0.3s;
  ${props => !!props.onClick ? 'cursor: pointer;' : ''}
  width: 160px;
  box-shadow: 2px 2px 1rem rgba(0, 0, 0, 0.5);

  border-radius: 16px;
  overflow: hidden;

  &:hover {
    ${props => !!props.onClick ? 'box-shadow: 2px 2px 1rem rgba(0, 0, 0, 1);' : ''}
  }
`

export const CardImage = styled.div<CardImageProps>`
  width: 100%;
  height: 160px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: ${props => props.backgroundPosition ?? 'center'};
`

export const CardInfo = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid red;
  padding: 8px;
  background-color: #FFFFFF;

  p {
    font-weight: bold;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

export const FavoriteIconWrapper = styled.div`
  .hover-favorite-icon {
    display: none;
  }

  &:hover {
    .hover-favorite-icon {
      display: block;
    }
    .default-favorite-icon {
      display: none;
    }
  }
`