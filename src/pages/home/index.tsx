import { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CharacterCard from "src/components/CharacterCard";
import LoadingSpinner from "src/components/LoadingSpinner";
import SearchBar from "src/components/SearchBar";
import { ApiService } from "src/services/api_service";
import { CharactersFilters, CharactersWrapper, GridWrapper, HomeWrapper } from "./styles";
import { CharacterDataWrapperProps, CharacterProps } from "./types";
import logoPath from 'src/assets/logo.svg';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterProps[]>();
  const [characterTotal, setCharacterTotal] = useState<number>();
  const [searchValue, setSearchValue] = useState<string>();
  const [reverseOrder, setReverseOrder] = useState<boolean>(false);



  useEffect(() => {
    let timer = setTimeout(() => getCharacters({ nameStartsWith: searchValue, reverse: false }), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, reverseOrder])

  const getCharacters = async (params?: { nameStartsWith?: string, offset?: number, reverse?: boolean }) => {
    let localParams = {
      ...(params?.nameStartsWith && params?.nameStartsWith?.length > 0 ? { nameStartsWith: params?.nameStartsWith } : {}),
      orderBy: params?.reverse ? '-name' : 'name'
    }
    setIsLoading(true);
    setHasError(false);
    let resp = await ApiService.api.get(
      'characters',
      { params: localParams }

    );
    if (resp.status === 200) {
      let characterDataWrapper: CharacterDataWrapperProps = resp.data
      setCharacterTotal(characterDataWrapper.data?.total)
      setCharacters(characterDataWrapper.data?.results)
    } else {
      setHasError(true);
    }
    setIsLoading(false);
  }

  const handleSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(typeof e.target.value)
    setSearchValue(e.target.value)
  }

  return <HomeWrapper>
    <img src={logoPath} />
    <h2>EXPLORE O UNIVERSO</h2>
    <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
    <SearchBar
      placeholder="Procure por heróis"
      onChange={handleSearchBarChange}
    />
    {
      isLoading
        ? <LoadingSpinner />
        : <CharactersWrapper>
          <CharactersFilters>
            <b>Encontrados {characterTotal} heróis</b>
            <div className="subgroup">
              Ordenar por nome - A/Z
              Somente favoritos
            </div>
          </CharactersFilters>
          <GridWrapper>
            {
              characters?.map((character: CharacterProps) => {
                return <CharacterCard
                  title={character.name}
                  imageUrl={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
                />
              })
            }
          </GridWrapper>
        </CharactersWrapper>
    }
    <Link to="/details">ir para details</Link>
  </HomeWrapper>
}

export default Home;