import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

export function usePledges() {
  const [pledges, setPladges] = useLocalStorage("cleancity-pledges", []);

  const addPledges = (text) => {
    setPladges((current) => [
      { id: makeId(), text, createdAt: new Date.toISOString() },
      ...current,
    ]);
  };

  const pledgeCount = useMemo(() => pledges.length, [pledges]);

  return { pledges, addPledges, pledgeCount };
}
