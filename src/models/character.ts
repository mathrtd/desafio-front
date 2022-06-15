import { ComicListProps } from "./comic";
import { ImageProps } from "./helpers";

export interface CharacterDataWrapperProps {
  code?: number;
  status?: string;
  copyright?: string;
  attributionText?: string;
  attributionHTML?: string;
  data?: CharacterDataContainerProps;
  etag?: string;
}

export interface CharacterDataContainerProps {
  offset?: number;
  limit?: number;
  total?: number;
  count?: number;
  results?: CharacterProps[];
}

export interface CharacterProps {
  id?: number;
  name?: string;
  description?: string;
  modified?: Date;
  resourceURI?: string;
  urls?: string[];
  thumbnail?: ImageProps;
  comics?: ComicListProps;
}