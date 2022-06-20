import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "src/components/Grid";
import InfoCard from "src/components/InfoCard";
import { CharacterDataWrapperProps, CharacterProps } from "src/models/character";
import { ComicDataContainerProps, ComicDataWrapperProps, ComicProps } from "src/models/comic";
import { ApiService } from "src/services/api_service";
import { CharacterDetailsHeader, CharacterDetailsSection, CharacterImage, DetailsWrapper, LatestReleasesSection } from "./styles";
import { Column, Row } from "src/styles";
import updateFavoriteCharacters from "src/helpers/updateFavoriteCharacters";
import isCharacterFavorite from "src/helpers/isCharacterFavorite";
import SearchBar from "src/components/SearchBar";
import LoadingSpinner from "src/components/LoadingSpinner";

import favIconPath from 'src/assets/favorito_01.svg';
import favIconOutlinePath from 'src/assets/favorito_02.svg';
import favIconHoverPath from 'src/assets/favorito_03.svg';
import comicsIconPath from 'src/assets/ic_quadrinhos.svg';
import moviesIconPath from 'src/assets/ic_trailer.svg';
import logoPath from 'src/assets/logo_menor.svg';
import starIconPath from 'src/assets/avaliacao_on.svg';

type PageParams = {
  characterId: string;
}

const Details: React.FC = () => {
  const params = useParams<PageParams>();
  const [searchValue, setSearchValue] = useState<string>();
  const [character, setCharacter] = useState<CharacterProps>()
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [comics, setComics] = useState<ComicProps[]>();
  const [comicsTotal, setComicsTotal] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const navigate = useNavigate()

  // hooks
  useEffect(() => {
    setIsLoading(true);
    Promise.allSettled([
      getCharacterDetails(parseInt(params.characterId ?? '1')),
      getCharacterComics(parseInt(params.characterId ?? '1'))
    ]).then((results) => {
      let [characterResults, comicsResults] = results;
      if (characterResults.status === "fulfilled" && comicsResults.status === "fulfilled") {
        setIsFavorite(isCharacterFavorite(parseInt(params.characterId ?? '1')))
        setCharacter(characterResults.value);
        setComics(comicsResults.value?.results);
        setComicsTotal(comicsResults.value?.total);
        setHasError(false);
      } else {
        setHasError(true);
      }
    }).finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (searchValue && searchValue.length > 0) {
      let timer = setTimeout(() => navigate('/', { state: { query: searchValue } }), 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [searchValue])

  const getCharacterDetails = async (id: number): Promise<CharacterProps | undefined> => {
    const resp = await ApiService.api.get(`characters/${id}`)
    if (resp.status === 200) {
      let characterDataWrapper: CharacterDataWrapperProps = resp.data
      return characterDataWrapper.data?.results?.[0]
    }
    throw Error(resp.toString());
  }

  const getCharacterComics = async (id: number): Promise<ComicDataContainerProps | undefined> => {
    const resp = await ApiService.api.get(`characters/${id}/comics?orderBy=-onsaleDate&limit=10`)
    if (resp.status === 200) {
      let characterDataWrapper: ComicDataWrapperProps = resp.data
      return characterDataWrapper.data
    }
    throw Error(resp.toString());
  }

  // input handlers
  const handleSearchBarChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleFavoriteChange = () => {
    try {
      updateFavoriteCharacters(!isFavorite, character)
      setIsFavorite(!isFavorite)
    } catch (_) {
      throw Error('erro');
    }
  }

  return <DetailsWrapper>
    <CharacterDetailsHeader>
      <img
        alt="marvel logo"
        src={logoPath}
        onClick={() => navigate('/')}
      />
      <SearchBar
        placeholder="Procure por heróis"
        onChange={handleSearchBarChange}
      />
    </CharacterDetailsHeader>
    {
      isLoading
        ? <LoadingSpinner />
        : hasError
          ? <b>Ops, tivemos um problema. Tente atualizar a página.</b>
          : <>
            <CharacterDetailsSection>
              <div className="left-section">
                <h1>
                  {character?.name}
                  <div
                    className="favorite-icon-wrapper"
                    onClick={() => handleFavoriteChange()}
                  >
                    <img alt="favorite icon" className="default-favorite-icon" src={isFavorite ? favIconPath : favIconOutlinePath} />
                    <img alt="favorite icon" className="hover-favorite-icon" src={favIconHoverPath} />
                  </div>
                </h1>
                <p>{character?.description && character?.description?.length > 0 ? character.description : 'Personagem sem descrição.'}</p>
                <Column className="metrics">
                  <Row className="counters">
                    <div>
                      <span>Quadrinhos</span><br />
                      <img alt="comics icon" src={comicsIconPath} />{comicsTotal}
                    </div>
                    <div>
                      <span>Filmes</span><br />
                      <img alt="movies icon" src={moviesIconPath} />6
                    </div>
                  </Row>
                  <div>
                    Rating: {Array.from(Array(5), (_, index) => <img alt="favorite star icon" key={index} src={starIconPath}></img>)}
                  </div>
                  <div>
                    Último quadrinho: {new Date(comics?.[0]?.dates?.find((date) => date.type === 'onsaleDate')?.date ?? Date()).toLocaleDateString('pt-BR')}
                  </div>
                </Column>
              </div>
              <div className="right-section">
                <CharacterImage imageUrl={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`} />
              </div>
            </CharacterDetailsSection>
            <LatestReleasesSection>
              <h4>Últimos lançamentos</h4>
              {
                comics && comics?.length > 0
                  ? <Grid
                      columnCount={6}
                      gap="32px"
                      minWidth="160px"
                    >
                      {
                        comics?.map((comic, index) => {
                          return <InfoCard
                            key={index}
                            title={comic.title}
                            imageUrl={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
                            backgroundPosition={'top'}
                          />
                        })
                      }
                    </Grid>
                  : 'Nenhum lançamento encontrado.'
                }
            </LatestReleasesSection>
          </>
    }
  </DetailsWrapper>
}

export default Details;