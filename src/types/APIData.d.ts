import { RaitingOptions } from "./Raiting";

export interface APIData {
  request_hash?: string;
  request_cached?: boolean;
  request_cache_expiry?: number;
  mal_id?: number;
  url?: string;
  image_url?: string;
  trailer_url?: string;
  title?: string;
  title_english?: string;
  title_japanese?: string;
  title_synonyms?: any[];
  type?: string;
  source?: string;
  episodes?: number;
  status?: string;
  airing?: boolean;
  aired?: Aired;
  duration?: string;
  rating?: RaitingOptions;
  score?: number;
  scored_by?: number;
  rank?: number;
  popularity?: number;
  members?: number;
  favorites?: number;
  synopsis?: string;
  background?: string;
  premiered?: string;
  broadcast?: string;
  related?: Related;
  producers?: Genre[];
  licensors?: Genre[];
  studios?: Genre[];
  genres?: Genre[];
  explicit_genres?: any[];
  demographics?: any[];
  themes?: Genre[];
  opening_themes?: string[];
  ending_themes?: string[];
  external_links?: ExternalLink[];
}

export interface Aired {
  from?: Date;
  to?: Date;
  prop?: Prop;
  string?: string;
}

export interface Prop {
  from?: From;
  to?: From;
}

export interface From {
  day?: number;
  month?: number;
  year?: number;
}

export interface ExternalLink {
  name?: string;
  url?: string;
}

export interface Genre {
  mal_id?: number;
  type?: Type;
  name?: string;
  url?: string;
}

export enum Type {
  Anime = "anime",
  Manga = "manga",
}

export interface Related {
  Adaptation?: Genre[];
  "Side story"?: Genre[];
  Summary?: Genre[];
}
