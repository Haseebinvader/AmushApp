"use client";
import Image from "next/image";
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
      <Image
        src="/amushlogo1.png"
        alt="Aumsh Ventures"
        className="w-48 h-48 md:w-100 md:h-100 object-contain animate-pulse"
        width={200}
        height={200}
      />
    </div>
  );
}
