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
        stubs: { Card: true },
      },
    });

    expect(wrapper.find(".animate-spin").exists()).toBe(true);
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
        stubs: { Card: true },
      },
    });

    await flushPromises();

    expect(wrapper.find(".animate-spin").exists()).toBe(false);
    expect(api.getLocations).toHaveBeenCalledTimes(1);
    expect(wrapper.findAll("card-stub").length).toBe(2);
  });

  it("renders error state on failure", async () => {
    api.getLocations.mockRejectedValue(new Error("Failed"));

    const wrapper = mount(Locations, {
      global: {
        stubs: { Card: true },
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain("Failed to load locations");
  });
});
