import styled from 'styled-components';
import { CharacterDetailsSectionProps, ComicImageProps } from './types';

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`

export const CharacterDetailsHeader = styled.div`
  width: 100%;
  margin-bottom: 16px;
  display: flex;
  img {
    cursor: pointer;
    margin-right: 32px;
  }
`

export const CharacterDetailsSection = styled.section<CharacterDetailsSectionProps>`
  width: 100%;
  display: flex;

  .left-section {
    flex: 1;
    margin-right: 16px;
    h1 {
      height: 32px;
      display: flex;
      justify-content: space-between;
    }

    img {
      width: 24px;
      height: 24px;
      margin-right: 4px;
    }

    .favorite-icon-wrapper {
      cursor: pointer;
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
    }
  }

  .right-section {
    flex: 2;
    width: 100%;
    height: 320px;
    background-image: url(${props => props.imageUrl});
    background-size: cover;
    background-position: center;
  }
`

export const LatestReleasesSection = styled.section`
  width: 100%;
  &.comics-grid {
    display: grid;
  }
`

export const ComicWrapper = styled.div`
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

export const ComicImage = styled.div<ComicImageProps>`
  width: 100%;
  height: 160px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`