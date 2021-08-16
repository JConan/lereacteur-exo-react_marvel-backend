import MarvelAPI from "./marvel";
import axios from "axios";
import { Comic } from "./marvel.d";

describe("request data from API provider /comics", () => {
  const mockedAxiosGet = jest.spyOn(axios, "get");

  const mockOnce = (comics: Array<Comic>) =>
    mockedAxiosGet.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        data: {
          count: comics.length,
          limit: 100,
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
    expect(result).toEqual([]);
  });

  it("should be able to retrieve single comic", async () => {
    mockOnce([comic]);
    const result = await MarvelAPI.getComics();
    expect(result).toEqual([comic]);
  });

  it("should be able to retrieve multiple comic", async () => {
    mockOnce([comic, comic]);
    const result = await MarvelAPI.getComics();
    expect(result).toEqual([comic, comic]);
  });
});
