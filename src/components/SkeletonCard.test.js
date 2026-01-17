import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SkeletonCard from "./SkeletonCard.vue";

describe("SkeletonCard", () => {
  it("renders correctly", () => {
    const wrapper = mount(SkeletonCard);
    expect(wrapper.exists()).toBe(true);
  });

  it("has animate-pulse class for animation", () => {
    const wrapper = mount(SkeletonCard);
    const card = wrapper.find("div");
    expect(card.classes()).toContain("animate-pulse");
  });

  it("renders skeleton image placeholder", () => {
    const wrapper = mount(SkeletonCard);
    const imageSkeleton = wrapper.find(".h-64");
    expect(imageSkeleton.exists()).toBe(true);
    expect(imageSkeleton.classes()).toContain("bg-zinc-300");
  });

  it("renders skeleton title", () => {
    const wrapper = mount(SkeletonCard);
    const titleSkeleton = wrapper.find(".h-6");
    expect(titleSkeleton.exists()).toBe(true);
    expect(titleSkeleton.classes()).toContain("w-3/4");
  });

  it("renders skeleton subtitle", () => {
    const wrapper = mount(SkeletonCard);
    const subtitleSkeleton = wrapper.find(".h-4");
    expect(subtitleSkeleton.exists()).toBe(true);
    expect(subtitleSkeleton.classes()).toContain("w-1/2");
  });

  it("renders skeleton badges", () => {
    const wrapper = mount(SkeletonCard);
    const badges = wrapper.findAll(".rounded-full");
    expect(badges.length).toBe(2);
  });

  it("has proper dark mode classes", () => {
    const wrapper = mount(SkeletonCard);
    const card = wrapper.find("div");
    expect(card.classes()).toContain("dark:bg-zinc-800");
  });

  it("has proper border styling", () => {
    const wrapper = mount(SkeletonCard);
    const card = wrapper.find("div");
    expect(card.classes()).toContain("border");
    expect(card.classes()).toContain("border-zinc-100");
    expect(card.classes()).toContain("dark:border-zinc-700");
  });

  it("has rounded corners", () => {
    const wrapper = mount(SkeletonCard);
    const card = wrapper.find("div");
    expect(card.classes()).toContain("rounded-2xl");
  });

  it("has shadow", () => {
    const wrapper = mount(SkeletonCard);
    const card = wrapper.find("div");
    expect(card.classes()).toContain("shadow-md");
  });
});
