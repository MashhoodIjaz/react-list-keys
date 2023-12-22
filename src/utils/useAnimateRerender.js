import { useEffect, useRef } from "react";

export default function useAnimateRerender(
  rerenderTransition1,
  rerenderTransition2,
  firstRenderTransition = ""
) {
  const firstRenderRef = useRef(true);
  const appliedClassRef = useRef(firstRenderTransition);

  useEffect(() => {
    appliedClassRef.current =
      appliedClassRef.current === rerenderTransition1
        ? rerenderTransition2
        : rerenderTransition1;
  });

  useEffect(() => {
    firstRenderRef.current = false;
    appliedClassRef.current = rerenderTransition1;
  }, []);

  return firstRenderRef.current
    ? firstRenderTransition
    : appliedClassRef.current;
}
