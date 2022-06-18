import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Grid from "src/components/Grid";
import InfoCard from "src/components/InfoCard";
import { CharacterDataWrapperProps, CharacterProps } from "src/models/character";
import { ComicDataWrapperProps, ComicProps } from "src/models/comic";
import { ApiService } from "src/services/api_service";
import { CharacterDetailsHeader, CharacterDetailsSection, ComicImage, ComicWrapper, DetailsWrapper, LatestReleasesSection } from "./styles";
import { Row } from "src/styles";
import updateFavoriteCharacters from "src/helpers/updateFavoriteCharacters";
import isCharacterFavorite from "src/helpers/isCharacterFavorite";
import SearchBar from "src/components/SearchBar";

import favIconPath from 'src/assets/favorito_01.svg';
import favIconOutlinePath from 'src/assets/favorito_02.svg';
import favIconHoverPath from 'src/assets/favorito_03.svg';
import comicsIconPath from 'src/assets/ic_quadrinhos.svg';
import moviesIconPath from 'src/assets/ic_trailer.svg';
import logoPath from 'src/assets/logo_menor.svg';
import LoadingSpinner from "src/components/LoadingSpinner";

type PageParams = {
  characterId: string;
}

const Details: React.FC = () => {
  const params = useParams<PageParams>();
  const [searchValue, setSearchValue] = useState<string>();
  const [character, setCharacter] = useState<CharacterProps>()
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [comics, setComics] = useState<ComicProps[]>();
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
        setComics(comicsResults.value);
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
    throw 'erro';
  }

  const getCharacterComics = async (id: number): Promise<ComicProps[] | undefined> => {
    const resp = await ApiService.api.get(`characters/${id}/comics?orderBy=-onsaleDate&limit=10`)
    if (resp.status === 200) {
      let characterDataWrapper: ComicDataWrapperProps = resp.data
      return characterDataWrapper.data?.results
    }
    throw 'erro';
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
    }
  }

  return <DetailsWrapper>
    <CharacterDetailsHeader>
      <img
        src={logoPath}
        onClick={() => navigate('/')}
      />
      <SearchBar
        onChange={handleSearchBarChange}
      />
    </CharacterDetailsHeader>
    {
      isLoading
        ? <LoadingSpinner />
        : hasError
          ? <b>Ops, tivemos um problema. Tente atualizar a página.</b>
          : <>
              <CharacterDetailsSection
                imageUrl={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}
              >
                <div className="left-section">
                  <h1>
                    {character?.name}
                    <div
                      className="favorite-icon-wrapper"
                      onClick={() => handleFavoriteChange()}
                    >
                      <img className="default-favorite-icon" src={isFavorite ? favIconPath : favIconOutlinePath} />
                      <img className="hover-favorite-icon" src={favIconHoverPath} />
                    </div>
                  </h1>
                  <p>{character?.description ?? 'N/A'}</p>
                  <Row>
                    <div>
                      <span>Quadrinhos</span><br />
                      <img src={comicsIconPath} />3000
                    </div>
                    <div>
                      <span>Filmes</span><br />
                      <img src={moviesIconPath} />3000
                    </div>
                  </Row>
                </div>
                <div className="right-section">
                  {/* <img src={`${character?.thumbnail?.path}.${character?.thumbnail?.extension}`}/> */}
                </div>
              </CharacterDetailsSection>
              <LatestReleasesSection>
                <h4>Últimos lançamentos</h4>
                <Grid
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
              </LatestReleasesSection>
            </>
    }
  </DetailsWrapper>
}

export default Details;