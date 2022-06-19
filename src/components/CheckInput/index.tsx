import { Label } from './styles';
import { CheckInputProps } from './types';
import toggleOnPath from 'src/assets/toggle_on.svg';
import toggleOffPath from 'src/assets/toggle_off.svg';

const CheckInput: React.FC<CheckInputProps> = ({
  name,
  label,
  checked,
  onCheckChange,
  ...props
}) => {
  const handleOnClick = () => {
    let newChecked = !checked;
    onCheckChange?.(newChecked ?? false, name);
  }

  return (
    <div>
      <Label
        onClick={handleOnClick}
      >
        {label}
        {
          <img src={checked ? toggleOnPath : toggleOffPath} alt="" />
        }
      </Label>
    </div>
  )
  
};

export default CheckInput;