import { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import CharacterCard from "src/components/CharacterCard";
import LoadingSpinner from "src/components/LoadingSpinner";
import SearchBar from "src/components/SearchBar";
import { ApiService } from "src/services/api_service";
import { CharactersFilters, CharactersWrapper, HomeWrapper } from "./styles";
import { CharacterDataWrapperProps, CharacterProps } from "src/models/character";
import logoPath from 'src/assets/logo.svg';
import CheckInput from "src/components/CheckInput";
import favIconPath from 'src/assets/favorito_01.svg';
import favIconOutlinePath from 'src/assets/favorito_02.svg';
import { useNavigate } from "react-router-dom";
import Grid from "src/components/Grid";

let apiCharacters:CharacterProps[] | undefined;

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterProps[]>();
  const [characterTotal, setCharacterTotal] = useState<number>();
  const [searchValue, setSearchValue] = useState<string>();
  const [reverseOrder, setReverseOrder] = useState<boolean>(false);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const navigate = useNavigate()

  // hooks
  useEffect(() => {
    let timer = setTimeout(() => getCharacters({ nameStartsWith: searchValue, reverse: reverseOrder }), 500);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue])

  useEffect(() => {
    getCharacters({ nameStartsWith: searchValue, reverse: reverseOrder })
  }, [reverseOrder])

  useEffect(() => {
    if (onlyFavorites) {
      let currentFavorites: CharacterProps[] = JSON.parse(localStorage.getItem('favoritesList') ?? "[]");
      apiCharacters = characters;
      setCharacters(currentFavorites)
    } else {
      setCharacters(apiCharacters);
    }
  }, [onlyFavorites])

  // api calls
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

  // helpers
  const isCharacterFavorite = (characterId?: number): boolean => {
    let currentFavorites: CharacterProps[] = JSON.parse(localStorage.getItem('favoritesList') ?? "[]");
    return !!currentFavorites.find((character) => character.id === characterId);
  }

  // input handlers
  const handleSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleCheckInputChange = (newChecked: boolean, name?: string) => {
    setReverseOrder(newChecked);
  }

  const handleFavoritesFilterChange = () => {
    setOnlyFavorites(!onlyFavorites);
  }

  const handleFavoriteChange = (newValue: boolean, character?: CharacterProps) => {
    if (!character) return;

    // update local storage list
    let currentFavorites: CharacterProps[] = JSON.parse(localStorage.getItem('favoritesList') ?? "[]");
    if (newValue) {
      if (currentFavorites.length >= 5) return;
      currentFavorites.push(character);
    } else {
      const index = currentFavorites.map((character) => character.id).indexOf(character.id, 0);
      if (index > -1) {
        currentFavorites.splice(index, 1);
      }
    }
    localStorage.setItem('favoritesList', JSON.stringify(currentFavorites));

    // update screen
    setCharacters([...(characters ?? [])])
  }

  const handleCharacterCardClick = (characterId?: number) => {
    navigate(`details/${characterId}`);
  }

  return <HomeWrapper>
    <img src={logoPath} />
    <h2>EXPLORE O UNIVERSO</h2>
    <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
    <SearchBar
      placeholder="Procure por heróis"
      onChange={handleSearchBarChange}
    />
    <CharactersFilters>
      <b>Encontrados {characterTotal ?? 0} heróis</b>
      <div className="subgroup">
        <CheckInput
          label="Ordenar por nome - A/Z"
          checked={reverseOrder}
          onCheckChange={handleCheckInputChange}
        />
        <div onClick={() => handleFavoritesFilterChange()}>
          <img src={onlyFavorites ? favIconPath : favIconOutlinePath}></img>
          Somente favoritos
        </div>
      </div>
    </CharactersFilters>
    {
      isLoading
        ? <LoadingSpinner />
        : <CharactersWrapper>
          {/* <GridWrapper> */}
          <Grid
            columnCount={4}
            gap="32px"
            minWidth="160px"
          >
            {
              characters?.map((character: CharacterProps, index: number) => {
                return <CharacterCard
                  key={index}
                  characterId={character.id}
                  title={character.name}
                  imageUrl={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
                  onFavoriteChange={(newValue, _) => handleFavoriteChange(newValue, character)}
                  favorite={isCharacterFavorite(character.id)}
                  onClick={handleCharacterCardClick}
                />
              })
            }
          </Grid>
          {/* </GridWrapper> */}
        </CharactersWrapper>
    }
  </HomeWrapper>
}

export default Home;