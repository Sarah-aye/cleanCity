import { useMemo, useState } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { makeId } from "../utils/makeId";

export function usePledges() {
  const [pledges, setPledges] = useLocalStorage("cleancity-pledges", []);
  const [message, setMessage] = useState("");

  const addPledges = (text) => {
    setPledges((current) => [
      { id: makeId(), text, createdAt: new Date().toISOString() },
      ...current,
    ]);

    setMessage("Your pledge has been added. Thank you for taking action!");
  };

  const clearMessage = () => {
    setMessage("");
  };

  const pledgeCount = useMemo(() => pledges.length, [pledges]);

  return { pledges, addPledges, pledgeCount, message, clearMessage };
}
