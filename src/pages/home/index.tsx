import { ChangeEvent, useState } from "react";
import { useEffect } from "react";
import InfoCard from "src/components/InfoCard";
import LoadingSpinner from "src/components/LoadingSpinner";
import SearchBar from "src/components/SearchBar";
import { ApiService } from "src/services/api_service";
import { CharactersFilters, CharactersWrapper, HomeWrapper, Pagination } from "./styles";
import { CharacterDataWrapperProps, CharacterProps } from "src/models/character";
import logoPath from 'src/assets/logo.svg';
import CheckInput from "src/components/CheckInput";
import favIconPath from 'src/assets/favorito_01.svg';
import favIconOutlinePath from 'src/assets/favorito_02.svg';
import { useLocation, useNavigate } from "react-router-dom";
import Grid from "src/components/Grid";
import isCharacterFavorite from "src/helpers/isCharacterFavorite";
import updateFavoriteCharacters from "src/helpers/updateFavoriteCharacters";
import { HomeParamsProps } from "./types";
import useIsMounting from "src/hooks/useIsMounting";
import favoriteCharacters from "src/helpers/favoriteCharacters";

const DEFAULT_PAGE_SIZE = 20;

let apiCharacters: CharacterProps[] | undefined;

const Home: React.FC = ({ ...props }) => {
  const isMounting = useIsMounting();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [characters, setCharacters] = useState<CharacterProps[]>();
  const [characterTotal, setCharacterTotal] = useState<number>();
  const [searchValue, setSearchValue] = useState<string>('');
  const [reverseOrder, setReverseOrder] = useState<boolean>(false);
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const navigate = useNavigate();
  const { state } = useLocation();

  // hooks
  useEffect(() => {
    if (isMounting) {
      let params: HomeParamsProps = state as HomeParamsProps;
      let query = params?.query;
      if (query) {
        setSearchValue(query);
      } else {
        getCharacters();
      }
    }
  }, [])

  useEffect(() => {
    if (!isMounting) {
      let timer = setTimeout(() => getCharacters({ nameStartsWith: searchValue, reverse: reverseOrder, page: currentPage }), 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchValue])

  useEffect(() => {
    if (!isMounting) {
      getCharacters({ nameStartsWith: searchValue, reverse: reverseOrder, page: currentPage })
    }
  }, [reverseOrder, currentPage])

  useEffect(() => {
    if (!isMounting) {
      if (onlyFavorites) {
        let currentFavorites: CharacterProps[] = JSON.parse(localStorage.getItem('favoritesList') ?? "[]");
        apiCharacters = characters;
        setCharacters(currentFavorites)
      } else {
        setCharacters(apiCharacters);
      }
    }
  }, [onlyFavorites])

  useEffect(() => {
    setOnlyFavorites(false)
  }, [searchValue, reverseOrder])

  // api calls
  const getCharacters = async (params?: { nameStartsWith?: string, page?: number, reverse?: boolean }) => {
    let localParams = {
      ...(params?.nameStartsWith && params?.nameStartsWith?.length > 0 ? { nameStartsWith: params?.nameStartsWith } : {}),
      orderBy: params?.reverse ? '-name' : 'name',
      offset: params?.page ? (params?.page - 1) * DEFAULT_PAGE_SIZE : 0,
      limit: DEFAULT_PAGE_SIZE,
    }
    setIsLoading(true);
    let resp = await ApiService.api.get(
      'characters',
      { params: localParams }
    );
    if (resp.status === 200) {
      let characterDataWrapper: CharacterDataWrapperProps = resp.data
      setCharacterTotal(characterDataWrapper.data?.total)
      setCharacters(characterDataWrapper.data?.results)
      setHasError(false);
    } else {
      setHasError(true);
    }
    setIsLoading(false);
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
    updateFavoriteCharacters(newValue, character);
    setCharacters([...(characters ?? [])])
  }

  const handleCharacterCardClick = (characterId?: number) => {
    navigate(`details/${characterId}`);
  }

  const handlePageSelected = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  }

  return <HomeWrapper>
    <img alt="marvel logo" src={logoPath} />
    <h2>EXPLORE O UNIVERSO</h2>
    <p>Mergulhe no domínio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
    <SearchBar
      placeholder="Procure por heróis"
      value={searchValue}
      onChange={handleSearchBarChange}
    />
    <CharactersFilters>
      <div>
        <b>Encontrados {onlyFavorites ? favoriteCharacters().length : characterTotal ?? 0} heróis</b><br />
        {
          onlyFavorites
            ? null
            : <i>Página {currentPage} de {Math.ceil((characterTotal ?? 0) / DEFAULT_PAGE_SIZE)}</i>
        }

      </div>
      <div className="subgroup">
        <CheckInput
          label="Ordenar por nome - A/Z"
          checked={reverseOrder}
          onCheckChange={handleCheckInputChange}
        />
        <div onClick={() => handleFavoritesFilterChange()}>
          <img alt="favorite icon" src={onlyFavorites ? favIconPath : favIconOutlinePath}></img>
          Somente favoritos
        </div>
      </div>
    </CharactersFilters>
    {
      isLoading
        ? <LoadingSpinner />
        : hasError
          ? <b>Ops, tivemos um problema. Tente atualizar a página.</b>
          : <CharactersWrapper>
            {/* <GridWrapper> */}
            <Grid
              columnCount={4}
              gap="32px"
              minWidth="160px"
            >
              {
                characters?.map((character: CharacterProps, index: number) => {
                  return <InfoCard
                    key={index}
                    cardId={character.id}
                    title={character.name}
                    imageUrl={`${character.thumbnail?.path}.${character.thumbnail?.extension}`}
                    favorite={isCharacterFavorite(character.id)}
                    onFavoriteChange={(newValue, _) => handleFavoriteChange(newValue, character)}
                    onClick={handleCharacterCardClick}
                    showFavoriteIcon
                  />
                })
              }
            </Grid>
            {
              onlyFavorites
                ? null
                : <Pagination>
                  <b>Páginas:</b>
                  {
                    Array.from(Array(Math.ceil((characterTotal ?? 0) / DEFAULT_PAGE_SIZE)), (_, index) => {
                      return (
                        <button
                          key={index}
                          className={index + 1 === currentPage ? 'selected' : ''}
                          onClick={() => handlePageSelected(index + 1)}
                        >
                          {index + 1}
                        </button>
                      )
                    })
                  }
                </Pagination>
            }

            {/* </GridWrapper> */}
          </CharactersWrapper>
    }
  </HomeWrapper>
}

export default Home;