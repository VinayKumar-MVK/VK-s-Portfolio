import type { MouseEvent, TouchEvent } from "react";

type InteractiveElement = HTMLElement;

interface InteractionStyles {
  boxShadow?: string;
  border?: string;
  transform?: string;
}

function applyStyles(el: InteractiveElement, styles: InteractionStyles) {
  if (styles.boxShadow !== undefined) el.style.boxShadow = styles.boxShadow;
  if (styles.border !== undefined) el.style.border = styles.border;
  if (styles.transform !== undefined) el.style.transform = styles.transform;
}

/** Mouse + touch handlers so glow/highlight effects work on mobile taps. */
export function bindInteractionStyles(active: InteractionStyles, idle: InteractionStyles) {
  const activate = (e: MouseEvent<InteractiveElement> | TouchEvent<InteractiveElement>) => {
    applyStyles(e.currentTarget, active);
  };
  const deactivate = (e: MouseEvent<InteractiveElement> | TouchEvent<InteractiveElement>) => {
    applyStyles(e.currentTarget, idle);
  };

  return {
    onMouseEnter: activate,
    onMouseLeave: deactivate,
    onTouchStart: activate,
    onTouchEnd: deactivate,
    onTouchCancel: deactivate,
  };
}
