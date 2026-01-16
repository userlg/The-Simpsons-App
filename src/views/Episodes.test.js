import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Episodes from "./Episodes.vue";
import api from "../services/api";

// Mock API
vi.mock("../services/api", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      getEpisodes: vi.fn(),
    },
  };
});

describe("Episodes View", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    const promise = new Promise(() => {});
    api.getEpisodes.mockReturnValue({ data: promise });

    const wrapper = mount(Episodes, {
      global: {
        stubs: { Card: true },
      },
    });

    expect(wrapper.find(".animate-spin").exists()).toBe(true);
  });

  it("renders episodes on success", async () => {
    const mockEpisodes = [
      {
        id: 1,
        name: "Simpsons Roasting",
        season: 1,
        episode_number: 1,
        image_path: "/ep1.jpg",
      },
      {
        id: 2,
        name: "Bart the Genius",
        season: 1,
        episode_number: 2,
        image_path: null,
      },
    ];

    api.getEpisodes.mockResolvedValue({ data: mockEpisodes });

    const wrapper = mount(Episodes, {
      global: {
        stubs: { Card: true },
      },
    });

    await flushPromises();

    expect(wrapper.find(".animate-spin").exists()).toBe(false);
    expect(api.getEpisodes).toHaveBeenCalledTimes(1);
    // Use card-stub because we stubbed Card: true
    expect(wrapper.findAll("card-stub").length).toBe(2);
  });

  it("renders error state on failure", async () => {
    api.getEpisodes.mockRejectedValue(new Error("Failed"));

    const wrapper = mount(Episodes, {
      global: {
        stubs: { Card: true },
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain("Failed to load episodes");
  });
});
