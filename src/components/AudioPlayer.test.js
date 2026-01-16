import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import AudioPlayer from "./AudioPlayer.vue";

describe("AudioPlayer Component", () => {
  let audioInstance;

  beforeEach(() => {
    // Mock the Audio constructor
    audioInstance = {
      play: vi.fn().mockResolvedValue(undefined),
      pause: vi.fn(),
      loop: false,
      volume: 1,
    };

    global.Audio = vi.fn(function () {
      return audioInstance;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders with initial play state", () => {
    const wrapper = mount(AudioPlayer);
    expect(wrapper.text()).toContain("Play");
  });

  it("toggles to pause state when clicked", async () => {
    const wrapper = mount(AudioPlayer);
    await flushPromises();

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(wrapper.text()).toContain("Pause");
  });

  it("calls play and pause methods correctly", async () => {
    const wrapper = mount(AudioPlayer);
    await flushPromises();

    const button = wrapper.find("button");

    // First click - play
    await button.trigger("click");
    expect(audioInstance.play).toHaveBeenCalled();

    // Second click - pause
    await button.trigger("click");
    expect(audioInstance.pause).toHaveBeenCalled();
  });

  it("creates audio with correct path", async () => {
    mount(AudioPlayer);
    await flushPromises();

    expect(global.Audio).toHaveBeenCalledWith("/src/assets/audio/opening.mp3");
  });

  it("sets audio properties correctly on mount", async () => {
    mount(AudioPlayer);
    await flushPromises();

    expect(audioInstance.loop).toBe(true);
    expect(audioInstance.volume).toBe(0.3);
  });
});
