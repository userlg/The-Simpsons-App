import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import ErrorState from "./ErrorState.vue";

describe("ErrorState", () => {
  it("renders correctly", () => {
    const wrapper = mount(ErrorState);
    expect(wrapper.exists()).toBe(true);
  });

  it("displays default title", () => {
    const wrapper = mount(ErrorState);
    const title = wrapper.find("h3");
    expect(title.text()).toBe("Oops! Something went wrong");
  });

  it("displays custom title when provided", () => {
    const customTitle = "Custom Error Title";
    const wrapper = mount(ErrorState, {
      props: {
        title: customTitle,
      },
    });
    const title = wrapper.find("h3");
    expect(title.text()).toBe(customTitle);
  });

  it("displays default message", () => {
    const wrapper = mount(ErrorState);
    const message = wrapper.find("p");
    expect(message.text()).toBe("Failed to load data. Please try again later.");
  });

  it("displays custom message when provided", () => {
    const customMessage = "Custom error message";
    const wrapper = mount(ErrorState, {
      props: {
        message: customMessage,
      },
    });
    const message = wrapper.find("p");
    expect(message.text()).toBe(customMessage);
  });

  it("renders emoji icon", () => {
    const wrapper = mount(ErrorState);
    const emoji = wrapper.find(".text-6xl");
    expect(emoji.text()).toBe("😕");
  });

  it("renders Try Again button", () => {
    const wrapper = mount(ErrorState);
    const button = wrapper.find("button");
    expect(button.exists()).toBe(true);
    expect(button.text()).toBe("Try Again");
  });

  it("emits retry event when button is clicked", async () => {
    const wrapper = mount(ErrorState);
    const button = wrapper.find("button");

    await button.trigger("click");

    expect(wrapper.emitted()).toHaveProperty("retry");
    expect(wrapper.emitted("retry")).toHaveLength(1);
  });

  it("button has correct styling classes", () => {
    const wrapper = mount(ErrorState);
    const button = wrapper.find("button");
    expect(button.classes()).toContain("bg-simpson-blue");
    expect(button.classes()).toContain("text-white");
    expect(button.classes()).toContain("rounded-full");
  });

  it("has proper container styling", () => {
    const wrapper = mount(ErrorState);
    const container = wrapper.find("div");
    expect(container.classes()).toContain("text-center");
    expect(container.classes()).toContain("py-20");
    expect(container.classes()).toContain("max-w-md");
  });

  it("title has correct styling", () => {
    const wrapper = mount(ErrorState);
    const title = wrapper.find("h3");
    expect(title.classes()).toContain("text-2xl");
    expect(title.classes()).toContain("font-bold");
    expect(title.classes()).toContain("text-zinc-900");
    expect(title.classes()).toContain("dark:text-white");
  });

  it("message has correct styling", () => {
    const wrapper = mount(ErrorState);
    const message = wrapper.find("p");
    expect(message.classes()).toContain("text-zinc-600");
    expect(message.classes()).toContain("dark:text-zinc-400");
  });

  it("can be called multiple times", async () => {
    const wrapper = mount(ErrorState);
    const button = wrapper.find("button");

    await button.trigger("click");
    await button.trigger("click");
    await button.trigger("click");

    expect(wrapper.emitted("retry")).toHaveLength(3);
  });
});
