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
    const promise = new Promise(() => {}); // Never verify
    api.getCharacters.mockReturnValue({ data: promise });

    const wrapper = mount(Characters, {
      global: {
        stubs: { Card: true },
      },
    });

    // Tailwind spinner class check
    expect(wrapper.find(".animate-spin").exists()).toBe(true);
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
        stubs: { Card: true },
      },
    });

    await flushPromises();

    expect(wrapper.find(".animate-spin").exists()).toBe(false);

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
        stubs: { Card: true },
      },
    });

    await flushPromises();

    expect(wrapper.text()).toContain("Failed to load characters");
  });
});
