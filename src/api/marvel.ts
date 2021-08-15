import axios from "axios";
import { Comic, MarvelResponse } from "./marvel.d";

const config = {
  baseURL: process.env.MARVEL_API_BASEPATH,
  params: {
    apiKey: process.env.MARVEL_API_KEY,
  },
};

export const getComics = async () =>
  axios
    .get<MarvelResponse<Comic>>("/comics", config)
    .then((response) => response.data)
    .then((data) => Promise.resolve<Array<Comic>>([...data.results]));

export default {
  getComics,
};
