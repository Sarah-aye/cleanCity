import { useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { makeId } from "../utils/makeId";

export function usePledges() {
  const [pledges, setPledges] = useLocalStorage("cleancity-pledges", []);

  const addPledges = (text) => {
    setPledges((current) => [
      { id: makeId(), text, createdAt: new Date().toISOString() },
      ...current,
    ]);
  };

  const pledgeCount = useMemo(() => pledges.length, [pledges]);

  return { pledges, addPledges, pledgeCount };
}
