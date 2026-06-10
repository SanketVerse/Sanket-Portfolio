"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Cursor is only rendered on desktop (fine pointer) devices.
// We determine this once after mount.
export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  // Start hidden; show only after we confirm it's a non-touch device
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // This one-time check is a legitimate use of setState in an effect:
    // we're syncing with an external browser API (matchMedia), which can only
    // be queried on the client. The eslint rule is suppressed intentionally here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!window.matchMedia("(pointer: coarse)").matches) setVisible(true);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName.toLowerCase() === "a" ||
          target.tagName.toLowerCase() === "button" ||
          !!target.closest("a") ||
          !!target.closest("button")
      );
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 bg-foreground rounded-full pointer-events-none z-[9999] mix-blend-difference"
      animate={{
        x: mousePosition.x - 8,
        y: mousePosition.y - 8,
        scale: isHovering ? 4 : 1,
        backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "#ffffff",
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    />
  );
}
