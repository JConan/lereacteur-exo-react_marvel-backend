export interface Pagination {
  limit?: number;
  skip?: number;
}

export interface MarvelApiResponse<T> {
  count: number;
  limit: number;
  results: T[];
}

export interface Comic {
  thumbnail: {
    path: string;
    extension: string;
  };
  _id: string;
  title: string;
  description: string;
  __v: number;
}

export interface GetComicsReturn {
  count: number;
  limit: number;
  comics: Comic[];
}
