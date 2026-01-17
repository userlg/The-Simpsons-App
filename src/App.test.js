import { describe, it, expect } from "vitest";
import { mount, RouterLinkStub } from "@vue/test-utils";
import App from "./App.vue";

describe("App", () => {
  it("renders correctly", () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true,
          Navbar: true,
        },
      },
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(".min-h-screen").exists()).toBe(true);
  });

  it("has correct background classes", () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true,
          Navbar: true,
        },
      },
    });

    const container = wrapper.find("div");
    expect(container.classes()).toContain("bg-white");
    expect(container.classes()).toContain("dark:bg-zinc-900");
    expect(container.classes()).toContain("min-h-screen");
  });

  it("renders Navbar component", () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true,
          Navbar: true,
        },
      },
    });

    expect(wrapper.find("navbar-stub").exists()).toBe(true);
  });

  it("renders RouterView inside main tag", () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          RouterView: true,
          Navbar: true,
        },
      },
    });

    const main = wrapper.find("main");
    expect(main.exists()).toBe(true);
    expect(main.find("router-view-stub").exists()).toBe(true);
  });
});
