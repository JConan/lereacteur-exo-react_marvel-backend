import axios from "axios";
import { Comic, MarvelResponse, Pagination } from "./marvel.d";

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
    .get<MarvelResponse<Comic>>("/comics", {
      ...config,
      params: { ...config.params, ...params },
    })
    .then((response) => response.data)
    .then((data) => Promise.resolve<Array<Comic>>([...data.results]));

export const getComicsByCharacter = async (characterId: string) =>
  axios.get("/comics/" + characterId, config).then((reponse) => reponse.data);

export default {
  getComics,
  getComicsByCharacter,
};
