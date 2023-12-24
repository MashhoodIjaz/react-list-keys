import { useEffect, useRef } from "react";

/**
 * Custom React hook for animating rerenders by applying CSS classes.
 *
 * @param {string} rerenderClass - The CSS class to be applied during rerender.
 * @param {string} [firstRenderClass=""] - Optional CSS class applied only on the first render.
 *
 * @return {object} The React ref object pointing to the DOM element.
 *
 * @example
 * // Basic usage:
 * const elementRef = useAnimateRerender("animate-rerender");
 * .
 * .
 * .
 * <div ref={elementRef} />
 *
 * // With a class for the first render:
 * const elementRef = useAnimateRerender("animate-rerender", "initial-render");
 * .
 * .
 * .
 * <div ref={elementRef} />
 */
export default function useAnimateRerender(rerenderClass, firstRenderClass) {
  const elementRef = useRef(null);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    if (!firstRenderRef.current) {
      elementRef.current?.classList.add(rerenderClass);
    }

    return () => {
      elementRef.current?.classList.remove(rerenderClass);
      for (let animation of elementRef.current?.getAnimations()) {
        if (animation.animationName === rerenderClass) {
          animation.pause();
        }
      }
    };
  });

  useEffect(() => {
    elementRef.current?.classList.add(firstRenderClass);
    firstRenderRef.current = false;
    return () => {
      elementRef.current?.classList.remove(firstRenderClass);
      firstRenderRef.current = true;
    };
  }, []);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.onanimationend = (e) => {
        if (
          e.animationName === rerenderClass ||
          e.animationName === firstRenderClass
        ) {
          elementRef.current.classList.remove(e.animationName);
        }
      };
    }
  }, []);

  return elementRef;
}
