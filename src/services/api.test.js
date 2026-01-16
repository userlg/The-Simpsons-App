import { describe, it, expect, vi, beforeEach } from "vitest";
import api, { IMAGE_BASE_URL } from "./api";
// import axios from "axios"; // Not strictly needed if we just use the mocks

const mocks = vi.hoisted(() => {
  return {
    get: vi.fn(),
    use: vi.fn(),
  };
});

vi.mock("axios", () => {
  return {
    default: {
      create: vi.fn(() => ({
        get: mocks.get,
        interceptors: {
          response: {
            use: mocks.use,
          },
        },
      })),
    },
  };
});

describe("API Service", () => {
  beforeEach(() => {
    mocks.get.mockClear();
    // mocks.use.mockClear(); // Don't clear this as it runs on module load
  });

  it("should export IMAGE_BASE_URL", () => {
    expect(IMAGE_BASE_URL).toBe("https://cdn.thesimpsonsapi.com/500");
  });

  it("should setup interceptors", async () => {
    expect(mocks.use).toHaveBeenCalled();

    const successHandler = mocks.use.mock.calls[0][0];
    const errorHandler = mocks.use.mock.calls[0][1];

    // Test Success - wrapped in results
    const mockResponseResults = { data: { results: ["char1", "char2"] } };
    expect(successHandler(mockResponseResults).data).toEqual([
      "char1",
      "char2",
    ]);

    // Test Success - wrapped in docs
    const mockResponseDocs = { data: { docs: ["item1"] } };
    expect(successHandler(mockResponseDocs).data).toEqual(["item1"]);

    // Test Success - no wrapper
    const mockResponsePlain = { data: { foo: "bar" } };
    expect(successHandler(mockResponsePlain).data).toEqual({ foo: "bar" });

    // Test Error with await
    const mockError = new Error("Network Error");
    await expect(errorHandler(mockError)).rejects.toThrow("Network Error");
  });

  it("getCharacters calls correct endpoint", async () => {
    await api.getCharacters(2);
    expect(mocks.get).toHaveBeenCalledWith("/characters?page=2");

    await api.getCharacters(); // default
    expect(mocks.get).toHaveBeenCalledWith("/characters?page=1");
  });

  it("getCharacter calls correct endpoint", async () => {
    await api.getCharacter(5);
    expect(mocks.get).toHaveBeenCalledWith("/characters/5");
  });

  it("getEpisodes calls correct endpoint", async () => {
    await api.getEpisodes(3);
    expect(mocks.get).toHaveBeenCalledWith("/episodes?page=3");
  });

  it("getEpisode calls correct endpoint", async () => {
    await api.getEpisode(10);
    expect(mocks.get).toHaveBeenCalledWith("/episodes/10");
  });

  it("getLocations calls correct endpoint", async () => {
    await api.getLocations(4);
    expect(mocks.get).toHaveBeenCalledWith("/locations?page=4");
  });

  it("getLocation calls correct endpoint", async () => {
    await api.getLocation(99);
    expect(mocks.get).toHaveBeenCalledWith("/locations/99");
  });
});
