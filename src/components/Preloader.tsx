"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 1200); // 1.2s splash
    return () => clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <img src="/amushlogo1.png" alt="Amush Ventures" className="h-100 w-200 md:h-100 animate-pulse" />
    </div>
  );
}


