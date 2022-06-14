import styled from 'styled-components';
import { HeroImageProps } from './types';

export const HeroCardWrapper = styled.div`
  width: 160px;
  box-shadow: 2px 2px 1rem #888888;

  border-radius: 16px;
  overflow: hidden;
`

export const HeroImage = styled.div<HeroImageProps>`
  width: 100%;
  height: 160px;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
`

export const HeroInfo = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 2px solid red;
  padding: 4px;
  background-color: #FFFFFF;

  p {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`