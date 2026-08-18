import { useEffect, useState } from "react";

const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

/** True on desktop/laptop with a mouse; false on touch-first devices. */
export function useFinePointer() {
  const [hasFinePointer, setHasFinePointer] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(FINE_POINTER_QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(FINE_POINTER_QUERY);
    const update = () => setHasFinePointer(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return hasFinePointer;
}
