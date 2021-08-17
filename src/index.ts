import express from "express";
import { getCharacters, getComics, getComicsByCharacter } from "./api/marvel";

const app = express();

app.get("/comics", (request, response) => {
  getComics(request.query)
    .then((result) => response.json(result))
    .catch((error) => response.status(500).send(error));
});

app.get<{ characterId: string }>(
  "/comics/:characterId",
  (request, response) => {
    getComicsByCharacter(request.params.characterId)
      .then((result) => response.json(result))
      .catch((error) => response.status(500).send(error));
  }
);

app.get("/characters", (request, response) => {
  getCharacters(request.query)
    .then((result) => response.json(result))
    .catch((error) => response.status(500).send(error));
});

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
