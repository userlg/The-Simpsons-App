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
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    expect(wrapper.findAll("skeleton-card-stub").length).toBeGreaterThan(0);
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
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    expect(wrapper.findAll("skeleton-card-stub").length).toBe(0);
    expect(api.getEpisodes).toHaveBeenCalledTimes(1);
    // Use card-stub because we stubbed Card: true
    expect(wrapper.findAll("card-stub").length).toBe(2);
  });

  it("renders error state on failure", async () => {
    api.getEpisodes.mockRejectedValue(new Error("Failed"));

    const wrapper = mount(Episodes, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    expect(wrapper.find("error-state-stub").exists()).toBe(true);
  });

  it("handles search filtering", async () => {
    const mockEpisodes = [
      { id: 1, name: "Simpsons Roasting", season: 1, episode_number: 1 },
      { id: 2, name: "Bart the Genius", season: 1, episode_number: 2 },
      { id: 3, name: "Homer's Odyssey", season: 1, episode_number: 3 },
    ];

    api.getEpisodes.mockResolvedValue({ data: mockEpisodes });

    const wrapper = mount(Episodes, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    // Search for "Bart"
    const searchInput = wrapper.find('input[type="text"]');
    await searchInput.setValue("Bart");

    // Should show search count
    expect(wrapper.text()).toContain("Found 1 episode");
  });

  it("handles pagination - load more", async () => {
    const page1Data = Array(10)
      .fill(null)
      .map((_, i) => ({
        id: i + 1,
        name: `Episode ${i + 1}`,
        season: 1,
        episode_number: i + 1,
      }));

    api.getEpisodes.mockResolvedValueOnce({ data: page1Data });

    const wrapper = mount(Episodes, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    // Should have 10 episodes
    expect(wrapper.findAll("card-stub").length).toBe(10);
  });
});
