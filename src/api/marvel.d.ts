export interface Pagination {
  limit?: number;
  skip?: number;
}

export interface MarvelApiResponse<T> {
  count: number;
  limit: number;
  results: T[];
}

interface Thumbnail {
  path: string;
  extension: string;
}

export interface Comic {
  thumbnail: Thumbnail;
  _id: string;
  title: string;
  description: string;
  __v: number;
}

export interface ComicsByCharacter {
  thumbnail: Thumbnail;
  comics: Comic[];
  _id: string;
  name: string;
  description: string;
  __v: number;
}

export interface ComicIdsByCharacter {
  thumbnail: Thumbnail;
  comics: string[];
  _id: string;
  name: string;
  description: string;
  __v: number;
}

export interface GetComicsReturn {
  count: number;
  limit: number;
  comics: Comic[];
}
