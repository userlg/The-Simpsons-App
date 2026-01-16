import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Home from "./Home.vue";

describe("Home View", () => {
  it("renders correctly", () => {
    const wrapper = mount(Home, {
      global: {
        stubs: {
          Hero: { template: "<div>Hero Section</div>" },
          RouterLink: { template: "<a><slot/></a>" },
        },
      },
    });

    expect(wrapper.text()).toContain("Hero Section");
    expect(wrapper.text()).toContain("Meet Springfield's finest"); // Characters Card
    expect(wrapper.text()).toContain("Characters");
  });
});
