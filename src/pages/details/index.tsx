import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Grid from "src/components/Grid";
import { CharacterDataWrapperProps, CharacterProps } from "src/models/character";
import { ComicDataWrapperProps, ComicProps } from "src/models/comic";
import { ApiService } from "src/services/api_service";
import { CharacterDetailsSection, ComicImage, ComicWrapper, DetailsWrapper, LatestReleasesSection } from "./styles";

type PageParams = {
  characterId: string;
}

const Details: React.FC = () => {
  const params = useParams<PageParams>();
  const [character, setCharacter] = useState<CharacterProps>()
  const [comics, setComics] = useState<ComicProps[]>();

  useEffect(() => {
    Promise.allSettled([
      getCharacterDetails(parseInt(params.characterId ?? '1')),
      getCharacterComics(parseInt(params.characterId ?? '1'))
    ]).then((results) => {
      let [characterResults, comicsResults] = results;
      if (characterResults.status === "fulfilled" && comicsResults.status === "fulfilled") {
        setCharacter(characterResults.value);
        setComics(comicsResults.value);
      }
    })
  }, [])

  const getCharacterDetails = async (id: number):Promise<CharacterProps|undefined> => {
    const resp = await ApiService.api.get(`characters/${id}`)
    if (resp.status === 200) {
      let characterDataWrapper:CharacterDataWrapperProps = resp.data
      return characterDataWrapper.data?.results?.[0]
    }
    throw 'erro';
  }

  const getCharacterComics = async (id: number):Promise<ComicProps[]|undefined> => {
    const resp = await ApiService.api.get(`characters/${id}/comics?orderBy=-onsaleDate`)
    if (resp.status === 200) {
      let characterDataWrapper:ComicDataWrapperProps = resp.data
      return characterDataWrapper.data?.results
    }
    throw 'erro';
  }

  return <DetailsWrapper>
    <CharacterDetailsSection>
      <div className="left-section">
        <p>{character?.name}</p>
        <p>{character?.description ?? 'N/A'}</p>
      </div>
      <div className="right-section"></div>
    </CharacterDetailsSection>
    <LatestReleasesSection>
      <h4>Últimos lançamentos</h4>
      <Grid
        columnCount={6}
        gap="32px"
        minWidth="160px"
      >
        {
          comics?.map((comic) => {
            return <ComicWrapper>
              <ComicImage
                imageUrl={`${comic.thumbnail?.path}.${comic.thumbnail?.extension}`}
              />
              {comic.title}
            </ComicWrapper>
          })
        }
      </Grid>
    </LatestReleasesSection>
  </DetailsWrapper>
}

export default Details;