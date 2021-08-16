import axios from "axios";
import {
  Comic,
  ComicsByCharacter,
  GetComicsReturn,
  MarvelApiResponse,
  Pagination,
} from "./marvel.d";

const config = {
  baseURL: process.env.MARVEL_API_BASEPATH,
  params: {
    apiKey: process.env.MARVEL_API_KEY,
  },
};

export const getComics = async (params?: {
  limit?: number;
  skip?: number;
  title?: string;
}) =>
  axios
    .get<MarvelApiResponse<Comic>>("/comics", {
      ...config,
      params: { ...config.params, ...params },
    })
    .then((response) => response.data)
    .then((data) =>
      Promise.resolve<GetComicsReturn>({
        count: data.count,
        limit: data.limit,
        comics: [...data.results],
      })
    );

export const getComicsByCharacter = async (characterId: string) =>
  axios
    .get<ComicsByCharacter>("/comics/" + characterId, config)
    .then((response) => response.data);

export default {
  getComics,
  getComicsByCharacter,
};
