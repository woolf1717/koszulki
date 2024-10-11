"use client";

import { useEffect, useRef, useState } from "react";
import { AppCanvas } from "./ui/AppCanvas";
import { Overlay } from "./ui/Overlay";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center h-screen" ref={rootRef}>
      <AppCanvas forwardRef={rootRef} />
      <Overlay />
    </div>
  );
}
