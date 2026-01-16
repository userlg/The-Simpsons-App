import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import ThemeToggle from "./ThemeToggle.vue";

describe("ThemeToggle Component", () => {
  beforeEach(() => {
    // Clear localStorage and reset document class
    localStorage.clear();
    document.documentElement.classList.remove("dark");

    // Mock matchMedia
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // deprecated
        removeListener: vi.fn(), // deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  it("renders correctly", () => {
    const wrapper = mount(ThemeToggle);
    expect(wrapper.exists()).toBe(true);
  });

  it("toggles theme on click", async () => {
    const wrapper = mount(ThemeToggle);
    const button = wrapper.find("button");

    // Initial state (light)
    expect(document.documentElement.classList.contains("dark")).toBe(false);

    // Click to toggle dark
    await button.trigger("click");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");

    // Click to toggle light
    await button.trigger("click");
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
