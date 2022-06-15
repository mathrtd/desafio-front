import { ImageProps } from "./helpers";

export interface ComicDataWrapperProps {
  code?: number;
  status?: string;
  copyright?: string;
  attributionText?: string;
  attributionHTML?: string;
  data?: ComicDataContainerProps;
  etag?: string;
}

interface ComicDataContainerProps {
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

export interface ComicProps {
  title?: string;
  thumbnail?: ImageProps;
}