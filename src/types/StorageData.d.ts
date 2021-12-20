export interface StorageData {
  animelistExpiry: Date;
  username: string;
  dontShowAgain: boolean;
  animelist: Animes;
}

export interface Animes {
  anime: APIData[];
}
