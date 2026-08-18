import { useEffect, useRef } from "react";
import { useFinePointer } from "@/hooks/use-fine-pointer";

export function CustomCursor() {
  const hasFinePointer = useFinePointer();
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let frameId = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const animate = () => {
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      }
      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameId);
    };
  }, [hasFinePointer]);

  if (!hasFinePointer) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-50 -ml-1 -mt-1 shadow-[0_0_10px_rgba(0,217,255,1)]"
      />
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-primary rounded-full pointer-events-none z-50 -ml-4 -mt-4 transition-transform duration-75 ease-out opacity-50"
      />
    </>
  );
}
