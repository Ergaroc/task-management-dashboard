// React testing library
import { renderHook, act } from "@testing-library/react";
// Hook
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  let matchMediaMock: jest.Mock;

  beforeEach(() => {
    matchMediaMock = jest.fn();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: matchMediaMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function addListener(listeners: Array<() => void>, cb: () => void) {
    listeners.push(cb);
  }

  function removeListener(listeners: Array<() => void>, cb: () => void) {
    const idx = listeners.indexOf(cb);
    if (idx > -1) listeners.splice(idx, 1);
  }

  function dispatchChange(
    listeners: Array<() => void>,
    matchMediaMock: jest.Mock,
    newMatches: boolean
  ) {
    matchMediaMock.mock.results[0].value.matches = newMatches;
    listeners.forEach((cb) => cb());
  }

  function setupMatchMedia(matches: boolean) {
    const listeners: Array<() => void> = [];
    matchMediaMock.mockImplementation((query: string) => ({
      matches,
      media: query,
      addEventListener: (_: string, cb: () => void) =>
        addListener(listeners, cb),
      removeEventListener: (_: string, cb: () => void) =>
        removeListener(listeners, cb),
      dispatchChange: (newMatches: boolean) =>
        dispatchChange(listeners, matchMediaMock, newMatches),
    }));
  }

  it("should return true when media query matches", () => {
    setupMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery("(min-width: 600px)"));
    expect(result.current).toBe(true);
  });

  it("should return false when media query does not match", () => {
    setupMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery("(max-width: 599px)"));
    expect(result.current).toBe(false);
  });

  it("should update when media query match changes", () => {
    setupMatchMedia(false);
    const { result } = renderHook(() => useMediaQuery("(min-width: 600px)"));
    expect(result.current).toBe(false);

    act(() => {
      (window.matchMedia("(min-width: 600px)") as any).dispatchChange(true);
    });

    expect(result.current).toBe(true);
  });

  it("should clean up event listener on unmount", () => {
    setupMatchMedia(false);
    const removeEventListener = jest.fn();
    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener,
    }));

    const { unmount } = renderHook(() => useMediaQuery("(min-width: 600px)"));
    unmount();
    expect(removeEventListener).toHaveBeenCalled();
  });

  it("should update listener when query changes", () => {
    setupMatchMedia(false);
    const addEventListener = jest.fn();
    const removeEventListener = jest.fn();
    matchMediaMock.mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener,
      removeEventListener,
    }));

    const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
      initialProps: { query: "(min-width: 600px)" },
    });
    rerender({ query: "(max-width: 599px)" });
    expect(addEventListener).toHaveBeenCalled();
    expect(removeEventListener).toHaveBeenCalled();
  });
});
