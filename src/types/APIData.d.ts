import { RaitingOptions } from "./Raiting"

export interface APIData {
  mal_id: number
  url: string
  images: Images
  trailer: Trailer
  approved: boolean
  titles: Title[]
  title: string
  title_english: any
  title_japanese: string
  title_synonyms: string[]
  type: string
  source: string
  episodes: number
  status: string
  airing: boolean
  aired: Aired
  duration: string
  rating: RaitingOptions
  score: any
  scored_by: any
  rank: number
  popularity: number
  members: number
  favorites: number
  synopsis: string
  background: any
  season: any
  year: any
  broadcast: Broadcast
  producers: any[]
  licensors: any[]
  studios: Studio[]
  genres: Genre[]
  explicit_genres: any[]
  themes: Theme[]
  demographics: any[]
}

export interface APIRecommendationsData {
  entry: RecommendationsEntry
  url: string
  votes: number
}

export interface RecommendationsEntry {
  mal_id: number
  url: string
  images: Images
  title: string
}

export interface Images {
  jpg: Jpg
  webp: Webp
}

export interface Jpg {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Webp {
  image_url: string
  small_image_url: string
  large_image_url: string
}

export interface Trailer {
  youtube_id: any
  url: any
  embed_url: any
  images: Images2
}

export interface Images2 {
  image_url: any
  small_image_url: any
  medium_image_url: any
  large_image_url: any
  maximum_image_url: any
}

export interface Title {
  type: string
  title: string
}

export interface Aired {
  from: string
  to: any
  prop: Prop
  string: string
}

export interface Prop {
  from: From
  to: To
}

export interface From {
  day: number
  month: number
  year: number
}

export interface To {
  day: any
  month: any
  year: any
}

export interface Broadcast {
  day: any
  time: any
  timezone: any
  string: any
}

export interface Studio {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Genre {
  mal_id: number
  type: string
  name: string
  url: string
}

export interface Theme {
  mal_id: number
  type: string
  name: string
  url: string
}