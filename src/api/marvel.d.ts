export interface MarvelResponse<T> {
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
