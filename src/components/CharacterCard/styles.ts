import styled from 'styled-components';
import { CharacterImageProps } from './types';

export const CharacterCardWrapper = styled.div`
  transition: 0.3s;
  cursor: pointer;
  width: 160px;
  box-shadow: 2px 2px 1rem rgba(0, 0, 0, 0.5);

  border-radius: 16px;
  overflow: hidden;

  &:hover {
    box-shadow: 2px 2px 1rem rgba(0, 0, 0, 1);
  }
`

export const CharacterImage = styled.div<CharacterImageProps>`
  width: 100%;
  height: 160px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`

export const CharacterInfo = styled.div`
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