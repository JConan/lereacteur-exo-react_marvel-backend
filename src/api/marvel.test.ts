import MarvelAPI from "./marvel";
import axios from "axios";
import { Comic, ComicIdsByCharacter, ComicsByCharacter } from "./marvel.d";
const mockedAxiosGet = jest.spyOn(axios, "get");

describe("request API /comics", () => {
  const mockOnce = (comics: Array<Comic>, limit: number = 100) =>
    mockedAxiosGet.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {
          count: comics.length,
          limit,
          results: comics,
        },
      })
    );

  const comic: Comic = {
    __v: 0,
    _id: "some_id",
    description: "some description",
    thumbnail: {
      extension: "jpg",
      path: "url",
    },
    title: "some title",
  };

  it("should be able to send pagination and Env params", async () => {
    mockOnce([]);
    const filter = { limit: 100, skip: 0, title: "" };
    const result = await MarvelAPI.getComics(filter);
    expect(mockedAxiosGet).toHaveBeenLastCalledWith(
      "/comics",
      expect.objectContaining({
        baseURL: expect.any(String),
        params: expect.objectContaining({
          ...filter,
          apiKey: expect.any(String),
        }),
      })
    );
  });

  it("should return empty array when no results", async () => {
    mockOnce([]); // no comics

    const result = await MarvelAPI.getComics();
    expect(result).toEqual({ comics: [], count: 0, limit: 100 });
  });

  it("should be able to retrieve single comic", async () => {
    mockOnce([comic], 10);
    const result = await MarvelAPI.getComics();
    expect(result).toEqual({ count: 1, limit: 10, comics: [comic] });
  });

  it("should be able to retrieve multiple comic", async () => {
    mockOnce([comic, comic]);
    const result = await MarvelAPI.getComics();
    expect(result).toEqual({ comics: [comic, comic], count: 2, limit: 100 });
  });
});

describe("request API /comics/:characterId", () => {
  const comicByCharacter = {
    __v: 0,
    _id: "characterId",
    comics: [
      {
        __v: 0,
        _id: "comicId",
        description: "comicDescription",
        thumbnail: {
          extension: "image extension",
          path: "image path",
        },
        title: "comicTitle",
      },
    ],
  };

  it("should be able to send pagination and Env params and receive null", async () => {
    mockedAxiosGet.mockImplementationOnce(() =>
      Promise.resolve({ status: 200, data: null })
    );

    const result = await MarvelAPI.getComicsByCharacter("anything");
    expect(mockedAxiosGet).toHaveBeenLastCalledWith(
      "/comics/anything",
      expect.objectContaining({
        baseURL: expect.any(String),
        params: expect.objectContaining({
          apiKey: expect.any(String),
        }),
      })
    );
    expect(result).toEqual(null);
  });

  it("should be able to retrieve comics by character", async () => {
    mockedAxiosGet.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: comicByCharacter,
      })
    );
    const result = await MarvelAPI.getComicsByCharacter("anything");
    expect(result).toEqual(comicByCharacter);
  });
});

describe("request API /characters", () => {
  it("should be able to send expected params and retrieve data", async () => {
    const data: ComicIdsByCharacter = {
      __v: 0,
      _id: "id",
      comics: ["id"],
      description: "description",
      name: "name",
      thumbnail: {
        extension: "jpg",
        path: "",
      },
    };
    mockedAxiosGet.mockImplementationOnce(() =>
      Promise.resolve({ status: 200, data })
    );
    const filter = { limit: 10, skip: 123, name: "character" };

    const result = await MarvelAPI.getCharacters(filter);
    expect(mockedAxiosGet).toHaveBeenLastCalledWith(
      "/characters",
      expect.objectContaining({
        baseURL: expect.any(String),
        params: expect.objectContaining({
          ...filter,
          apiKey: expect.any(String),
        }),
      })
    );
    expect(result).toEqual(data);
  });
});
