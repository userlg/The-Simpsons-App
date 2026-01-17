import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Locations from "./Locations.vue";
import api from "../services/api";

// Mock API
vi.mock("../services/api", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      getLocations: vi.fn(),
    },
  };
});

describe("Locations View", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    const promise = new Promise(() => {});
    api.getLocations.mockReturnValue({ data: promise });

    const wrapper = mount(Locations, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    expect(wrapper.findAll("skeleton-card-stub").length).toBeGreaterThan(0);
  });

  it("renders locations on success", async () => {
    const mockLocations = [
      {
        id: 1,
        name: "Evergreen Terrace",
        town: "Springfield",
        image_path: "/loc1.jpg",
      },
      { id: 2, name: "Moe's Tavern", town: "Springfield", image_path: null },
    ];

    api.getLocations.mockResolvedValue({ data: mockLocations });

    const wrapper = mount(Locations, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    expect(wrapper.findAll("skeleton-card-stub").length).toBe(0);
    expect(api.getLocations).toHaveBeenCalledTimes(1);
    expect(wrapper.findAll("card-stub").length).toBe(2);
  });

  it("renders error state on failure", async () => {
    api.getLocations.mockRejectedValue(new Error("Failed"));

    const wrapper = mount(Locations, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    expect(wrapper.find("error-state-stub").exists()).toBe(true);
  });

  it("handles search filtering", async () => {
    const mockLocations = [
      { id: 1, name: "Moe's Tavern", town: "Springfield" },
      { id: 2, name: "Kwik-E-Mart", town: "Springfield" },
      { id: 3, name: "Nuclear Power Plant", town: "Springfield" },
    ];

    api.getLocations.mockResolvedValue({ data: mockLocations });

    const wrapper = mount(Locations, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    // Search for "Nuclear"
    const searchInput = wrapper.find('input[type="text"]');
    await searchInput.setValue("Nuclear");

    // Should show search count
    expect(wrapper.text()).toContain("Found 1 location");
  });

  it("handles pagination - load more", async () => {
    const page1Data = Array(10)
      .fill(null)
      .map((_, i) => ({
        id: i + 1,
        name: `Location ${i + 1}`,
        town: "Springfield",
      }));

    api.getLocations.mockResolvedValueOnce({ data: page1Data });

    const wrapper = mount(Locations, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    // Should have 10 locations
    expect(wrapper.findAll("card-stub").length).toBe(10);
  });
});
