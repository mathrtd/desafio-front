import styled from 'styled-components';
import { ComicImageProps } from './types';

export const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
`

export const CharacterDetailsSection = styled.section`
  width: 100%;
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