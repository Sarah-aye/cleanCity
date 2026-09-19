import { renderHook, act } from "@testing-library/react";
import { useRecyclingLog } from "./useRecyclingLog";

describe("useRecyclingLog - search and sort", () => {
  const logs = [
    {
      id: "abc-123",
      category: "Plastic",
      quantity: 10,
      createdAt: "2026-01-10T10:00:00.000Z",
    },
    {
      id: "def-456",
      category: "Glass",
      quantity: 5,
      createdAt: "2026-01-15T10:00:00.000Z",
    },
    {
      id: "ghi-789",
      category: "Paper",
      quantity: 20,
      createdAt: "2026-01-05T10:00:00.000Z",
    },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  // Test 1:
  // When there is no search term, all recycling logs
  // should be returned.
  it("returns all logs when there is no search term", () => {
    const { result } = renderHook(() => useRecyclingLog(logs));

    expect(result.current.filteredAndSortedLogs).toHaveLength(3);
  });

  // Test 2:
  // Searching for a category should return only logs
  // whose category contains the search term.
  it("filters logs by category", () => {
    const { result } = renderHook(() => useRecyclingLog(logs));

    act(() => {
      result.current.setSearchTerm("plastic");
    });

    expect(result.current.filteredAndSortedLogs).toHaveLength(1);

    expect(result.current.filteredAndSortedLogs[0].category).toBe("Plastic");
  });

  // Test 3:
  // Searching should be case-insensitive.
  it("performs a case-insensitive search", () => {
    const { result } = renderHook(() => useRecyclingLog(logs));

    act(() => {
      result.current.setSearchTerm("GLASS");
    });

    expect(result.current.filteredAndSortedLogs).toHaveLength(1);

    expect(result.current.filteredAndSortedLogs[0].category).toBe("Glass");
  });

  // Test 4:
  // A partial search term should match part of a category name.
  it("matches partial category names", () => {
    const { result } = renderHook(() => useRecyclingLog(logs));

    act(() => {
      result.current.setSearchTerm("lass");
    });

    expect(result.current.filteredAndSortedLogs).toHaveLength(1);

    expect(result.current.filteredAndSortedLogs[0].category).toBe("Glass");
  });

  // Test 5:
  // category-asc should sort categories alphabetically
  // from A to Z.
  it("sorts categories in ascending order", () => {
    const { result } = renderHook(() => useRecyclingLog(logs));

    act(() => {
      result.current.setSortBy("category-asc");
    });

    expect(
      result.current.filteredAndSortedLogs.map((log) => log.category),
    ).toEqual(["Glass", "Paper", "Plastic"]);
  });

  // Test 6:
  // category-desc should sort categories alphabetically
  // from Z to A.
  it("sorts categories in descending order", () => {
    const { result } = renderHook(() => useRecyclingLog(logs));

    act(() => {
      result.current.setSortBy("category-desc");
    });

    expect(
      result.current.filteredAndSortedLogs.map((log) => log.category),
    ).toEqual(["Plastic", "Paper", "Glass"]);
  });

  // Test 7:
  // quantity-asc should sort from the smallest quantity
  // to the largest quantity.
  it("sorts by quantity in ascending order", () => {
    const { result } = renderHook(() => useRecyclingLog(logs));

    act(() => {
      result.current.setSortBy("quantity-asc");
    });

    expect(
      result.current.filteredAndSortedLogs.map((log) => log.quantity),
    ).toEqual([5, 10, 20]);
  });

  // Test 8:
  // quantity-desc should sort from the largest quantity
  // to the smallest quantity.
  it("sorts by quantity in descending order", () => {
    const { result } = renderHook(() => useRecyclingLog(logs));

    act(() => {
      result.current.setSortBy("quantity-desc");
    });

    expect(
      result.current.filteredAndSortedLogs.map((log) => log.quantity),
    ).toEqual([20, 10, 5]);
  });

  // Test 9:
  // date-desc should place the newest recycling log first.
  it("sorts by date with newest first", () => {
    const { result } = renderHook(() => useRecyclingLog(logs));

    expect(
      result.current.filteredAndSortedLogs.map((log) => log.category),
    ).toEqual(["Glass", "Plastic", "Paper"]);
  });
});
