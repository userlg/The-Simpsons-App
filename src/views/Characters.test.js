import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import Characters from "./Characters.vue";
import api from "../services/api";

// Mock API
vi.mock("../services/api", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    default: {
      getCharacters: vi.fn(),
    },
  };
});

describe("Characters View", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state initially", () => {
    const promise = new Promise(() => {}); // Never resolve
    api.getCharacters.mockReturnValue({ data: promise });

    const wrapper = mount(Characters, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    // Check for skeleton cards instead of spinner
    expect(wrapper.findAll("skeleton-card-stub").length).toBeGreaterThan(0);
  });

  it("renders characters on success", async () => {
    const mockCharacters = [
      {
        id: 1,
        name: "Homer",
        occupation: "Inspector",
        portrait_path: "/homer.png",
        status: "Alive",
      },
      {
        id: 2,
        name: "Marge",
        occupation: "Housewife",
        portrait_path: null,
        status: "Alive",
      },
    ];

    api.getCharacters.mockResolvedValue({ data: mockCharacters });

    const wrapper = mount(Characters, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    expect(wrapper.findAll("skeleton-card-stub").length).toBe(0);

    // Check if API was called
    expect(api.getCharacters).toHaveBeenCalledTimes(1);

    // Check if cards are rendered.
    // When stubbing with `Card: true`, it renders <card-stub>.
    expect(wrapper.findAll("card-stub").length).toBe(2);
  });

  it("renders error state on failure", async () => {
    api.getCharacters.mockRejectedValue(new Error("Failed"));

    const wrapper = mount(Characters, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    // Check for ErrorState component instead of inline error text
    expect(wrapper.find("error-state-stub").exists()).toBe(true);
  });

  it("handles search filtering", async () => {
    const mockCharacters = [
      {
        id: 1,
        name: "Homer Simpson",
        occupation: "Inspector",
        status: "Alive",
      },
      { id: 2, name: "Bart Simpson", occupation: "Student", status: "Alive" },
      {
        id: 3,
        name: "Marge Simpson",
        occupation: "Housewife",
        status: "Alive",
      },
    ];

    api.getCharacters.mockResolvedValue({ data: mockCharacters });

    const wrapper = mount(Characters, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    // Initially all characters are shown
    expect(wrapper.findAll("card-stub").length).toBe(3);

    // Search for "Homer"
    const searchInput = wrapper.find('input[type="text"]');
    await searchInput.setValue("Homer");

    // Should show search count
    expect(wrapper.text()).toContain("Found 1 character");
  });

  it("handles pagination - load more", async () => {
    const page1Data = Array(10)
      .fill(null)
      .map((_, i) => ({
        id: i + 1,
        name: `Character ${i + 1}`,
        status: "Alive",
      }));
    const page2Data = Array(10)
      .fill(null)
      .map((_, i) => ({
        id: i + 11,
        name: `Character ${i + 11}`,
        status: "Alive",
      }));

    api.getCharacters
      .mockResolvedValueOnce({ data: page1Data })
      .mockResolvedValueOnce({ data: page2Data });

    const wrapper = mount(Characters, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    // Initially 10 characters
    expect(wrapper.findAll("card-stub").length).toBe(10);

    // Click load more
    const loadMoreButton = wrapper.find("button");
    await loadMoreButton.trigger("click");
    await flushPromises();

    // Now should have 20 characters
    expect(wrapper.findAll("card-stub").length).toBe(20);
    expect(api.getCharacters).toHaveBeenCalledTimes(2);
  });

  it("shows empty state when search has no results", async () => {
    const mockCharacters = [
      {
        id: 1,
        name: "Homer Simpson",
        occupation: "Inspector",
        status: "Alive",
      },
    ];

    api.getCharacters.mockResolvedValue({ data: mockCharacters });

    const wrapper = mount(Characters, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: true },
      },
    });

    await flushPromises();

    // Search for something that doesn't exist
    const searchInput = wrapper.find('input[type="text"]');
    await searchInput.setValue("NonExistent");

    // Should show empty state
    expect(wrapper.text()).toContain("No characters found");
    expect(wrapper.text()).toContain("D'oh!");
  });

  it("handles retry on error", async () => {
    api.getCharacters
      .mockRejectedValueOnce(new Error("Failed"))
      .mockResolvedValueOnce({
        data: [{ id: 1, name: "Homer", status: "Alive" }],
      });

    const wrapper = mount(Characters, {
      global: {
        stubs: { Card: true, SkeletonCard: true, ErrorState: false },
      },
    });

    await flushPromises();

    // Should show error state
    expect(wrapper.findComponent({ name: "ErrorState" }).exists()).toBe(true);

    // Click retry button
    wrapper.findComponent({ name: "ErrorState" }).vm.$emit("retry");
    await flushPromises();

    // Should now show characters
    expect(wrapper.findAll("card-stub").length).toBe(1);
  });
});
