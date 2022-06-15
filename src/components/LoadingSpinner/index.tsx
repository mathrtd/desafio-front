import { DefaultLoadingSpinner, LoadingSpinnerWrapper } from "./styles";

const LoadingSpinner:React.FC = () => {
  return (
    <LoadingSpinnerWrapper>
      <DefaultLoadingSpinner/>
    </LoadingSpinnerWrapper>
  );
}

export default LoadingSpinner;