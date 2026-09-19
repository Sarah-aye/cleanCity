import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

import { act, renderHook } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  // Reset localStorage and theme-related DOM changes before every test.
  beforeEach(() => {
    localStorage.clear();

    document.documentElement.className = "";
    document.documentElement.removeAttribute("data-bs-theme");
  });

  // Test 1:
  // When there is nothing stored in localStorage,
  // the hook should return the initial value provided to it.
  it("returns the initial value when nothing is stored", () => {
    const { result } = renderHook(() => useLocalStorage("name", "John"));

    expect(result.current[0]).toBe("John");
  });

  // Test 2:
  // When a value already exists in localStorage,
  // the hook should return the stored value instead of the initial value.
  it("returns the persisted value from localStorage", () => {
    localStorage.setItem("name", JSON.stringify("Jane"));

    const { result } = renderHook(() => useLocalStorage("name", "John"));

    expect(result.current[0]).toBe("Jane");
  });

  // Test 3:
  // When the setter is called, the hook should update its state
  // and also save the new value to localStorage.
  it("updates the value and persists it", () => {
    const { result } = renderHook(() => useLocalStorage("name", "John"));

    act(() => {
      result.current[1]("Jane");
    });

    expect(result.current[0]).toBe("Jane");

    expect(localStorage.getItem("name")).toBe(JSON.stringify("Jane"));
  });

  // Test 4:
  // The setter should support a function that receives the current value
  // and returns the new value, just like React's setState.
  it("supports functional updates", () => {
    const { result } = renderHook(() => useLocalStorage("count", 0));

    act(() => {
      result.current[1]((currentValue) => currentValue + 1);
    });

    expect(result.current[0]).toBe(1);

    expect(localStorage.getItem("count")).toBe("1");
  });

  // Test 5:
  // The hook should be able to store objects by converting them to JSON
  // and then return the object as a normal JavaScript value.
  it("persists objects", () => {
    const { result } = renderHook(() => useLocalStorage("user", null));

    const user = {
      name: "John",
      age: 30,
    };

    act(() => {
      result.current[1](user);
    });

    expect(result.current[0]).toEqual(user);

    expect(JSON.parse(localStorage.getItem("user"))).toEqual(user);
  });

  // Test 6:
  // When a storage event occurs, the hook should read the latest value
  // from localStorage and update its state.
  it("responds to storage events", () => {
    localStorage.setItem("name", JSON.stringify("John"));

    const { result } = renderHook(() => useLocalStorage("name", "Unknown"));

    expect(result.current[0]).toBe("John");

    localStorage.setItem("name", JSON.stringify("Jane"));

    act(() => {
      window.dispatchEvent(new Event("storage"));
    });

    expect(result.current[0]).toBe("Jane");
  });

  // Test 7:
  // When the hook manages the "theme" key and the value is "dark",
  // it should add the "dark" class to the document root
  // and set Bootstrap's data-bs-theme attribute to "dark".
  it("applies the dark theme", () => {
    const { result } = renderHook(() => useLocalStorage("theme", "light"));

    act(() => {
      result.current[1]("dark");
    });

    expect(document.documentElement).toHaveClass("dark");

    expect(document.documentElement).toHaveAttribute("data-bs-theme", "dark");
  });

  // Test 8:
  // When the theme value is "light", the hook should remove the "dark"
  // class and set Bootstrap's data-bs-theme attribute to "light".
  it("applies the light theme", () => {
    renderHook(() => useLocalStorage("theme", "light"));

    expect(document.documentElement).not.toHaveClass("dark");

    expect(document.documentElement).toHaveAttribute("data-bs-theme", "light");
  });
});
// describe("useLocalStorage", () => {
//   beforeEach(() => {
//     localStorage.clear();
//   });

//   it("returns the initial value when nothing is returned", () => {
//     localStorage.setItem("name", JSON.stringify("sarah"));
//     const { result } = renderHook(() => useLocalStorage("name", "jane"));

//     act(() => {
//       result.current[1]("jane");
//     });

//     expect(result.current[0]).toBe("jane");

//     expect(localStorage.getItem("name")).toBe(JSON.stringify("jane"));
//   });
// });
