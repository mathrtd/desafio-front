import styled, { keyframes } from 'styled-components';

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const LoadingSpinnerWrapper = styled.div`
  text-align: -webkit-center;
`

export const DefaultLoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid lightgray;
  border-top: 10px solid darkgray;
  border-radius: 50%;
  animation: ${spinner} 1.5s linear infinite;
`