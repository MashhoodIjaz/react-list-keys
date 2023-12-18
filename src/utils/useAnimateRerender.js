import { useEffect, useRef } from "react";

export default function useAnimateRerender() {
  const firstRenderRef = useRef(true);
  const appliedClassRef = useRef("");

  useEffect(() => {
    appliedClassRef.current =
      appliedClassRef.current === "animate-rerender-1"
        ? "animate-rerender-2"
        : "animate-rerender-1";
  });

  useEffect(() => {
    firstRenderRef.current = false;
    appliedClassRef.current = "animate-rerender-1";
  }, []);

  return firstRenderRef.current ? " " : appliedClassRef.current;
}
