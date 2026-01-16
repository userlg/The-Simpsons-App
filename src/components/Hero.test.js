import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import Hero from "./Hero.vue";

describe("Hero Component", () => {
  it("renders correctly", () => {
    const wrapper = mount(Hero, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
        },
      },
    });

    expect(wrapper.text()).toContain("Welcome to Springfield");
    expect(wrapper.text()).toContain("Meet the Cast");
    expect(wrapper.text()).toContain("Watch Episodes");
  });
});
