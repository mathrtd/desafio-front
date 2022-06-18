import { ImageProps } from "./helpers";

type ComicDateType = 'onsaleDate' | 'focDate'

export interface ComicDataWrapperProps {
  code?: number;
  status?: string;
  copyright?: string;
  attributionText?: string;
  attributionHTML?: string;
  data?: ComicDataContainerProps;
  etag?: string;
}

export interface ComicDataContainerProps {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: ComicProps[];
}

export interface ComicListProps {
  available?: number;
  returned?: number;
  collectionURI?: string;
  items?: ComicSummaryProps[];
}

interface ComicSummaryProps {
  resourceURI?: string;
  name?: string;
}

interface ComicDateProps {
  type?: ComicDateType;
  date?: Date;
}

export interface ComicProps {
  title?: string;
  thumbnail?: ImageProps;
  dates?: ComicDateProps[];
}