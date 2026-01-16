import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Card from "./Card.vue";

describe("Card Component", () => {
  it("renders props correctly", () => {
    const wrapper = mount(Card, {
      props: {
        title: "Test Title",
        subtitle: "Test Subtitle",
        image: "test-image.jpg",
        badges: ["Badge 1", "Badge 2"],
      },
    });

    expect(wrapper.text()).toContain("Test Title");
    expect(wrapper.text()).toContain("Test Subtitle");
    expect(wrapper.text()).toContain("Badge 1");
    expect(wrapper.text()).toContain("Badge 2");

    const img = wrapper.find("img");
    expect(img.attributes("src")).toBe("test-image.jpg");
  });

  it("handles image error fallback", async () => {
    const wrapper = mount(Card, {
      props: {
        title: "Error Image",
        image: "broken.jpg",
      },
    });

    const img = wrapper.find("img");

    // Trigger error event
    await img.trigger("error");

    // Check if src changed to fallback
    expect(img.element.src).toContain("placehold.co");
  });

  it("renders correctly without optional props", () => {
    const wrapper = mount(Card, {
      props: {
        title: "Minimal Card",
      },
    });

    expect(wrapper.text()).toContain("Minimal Card");
    expect(wrapper.find("img").exists()).toBe(false); // No image
    expect(wrapper.find("p.text-sm").exists()).toBe(false); // No subtitle
    expect(wrapper.find(".flex.flex-wrap").exists()).toBe(false); // No badges
  });

  it("handles empty values for optional props", () => {
    const wrapper = mount(Card, {
      props: {
        title: "Empty Props Card",
        image: "",
        subtitle: "",
        badges: [],
      },
    });

    expect(wrapper.text()).toContain("Empty Props Card");
    expect(wrapper.find("img").exists()).toBe(false); // Empty string should be falsy
    expect(wrapper.find("p.text-sm").exists()).toBe(false); // Empty string subtitle
    expect(wrapper.find(".flex.flex-wrap").exists()).toBe(false); // Empty array badges
  });
});
