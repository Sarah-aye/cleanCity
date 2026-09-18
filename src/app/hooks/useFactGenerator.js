"use client";

import { useState } from "react";
import { facts } from "../data/facts";

export default function useFactGenerator() {
  const [fact, setFact] = useState(facts[0]);

  const generateFact = () => {
    if (facts.length < 2) return;

    const available = facts.filter((item) => item !== fact);

    setFact(available[Math.floor(Math.random() * available.length)]);
  };

  return {
    fact,
    generateFact,
  };
}
