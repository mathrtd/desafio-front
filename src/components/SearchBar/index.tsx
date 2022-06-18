import React from 'react'
import { DefaultSearchBar, IconWrapper, SearchBarWrapper } from './styles';
import { SearchBarProps } from './types';
import searchIconPath from 'src/assets/ic_busca_menor.svg';

const SearchBar: React.FC<SearchBarProps> = ({ label, ...props }) => {
  return (
    <SearchBarWrapper
      {...props}
    >
      <IconWrapper>
        <img src={searchIconPath}/>
      </IconWrapper>
      <DefaultSearchBar
        {...props}
      />
    </SearchBarWrapper>
  )
}

export default SearchBar;
