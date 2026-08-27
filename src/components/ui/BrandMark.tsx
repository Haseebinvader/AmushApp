import Image from "next/image";
import { company } from "@/content/site";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  size?: "header" | "footer" | "splash";
  compact?: boolean;
  className?: string;
};

const sizes = {
  header: "h-[120px] w-[120px] md:h-[152px] md:w-[152px]",
  headerCompact: "h-16 w-16 md:h-[72px] md:w-[72px]",
  footer: "h-[128px] w-[128px] md:h-[152px] md:w-[152px]",
  splash: "h-[220px] w-[220px] md:h-[260px] md:w-[260px]",
};

export default function BrandMark({ size = "header", compact = false, className }: BrandMarkProps) {
  const frame = size === "header" && compact ? sizes.headerCompact : sizes[size];

  return (
    <span
      className={cn(
        "relative block overflow-hidden bg-black transition-[width,height,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        frame,
        className
      )}
    >
      <Image
        src="/amushlogos.png"
        alt={company.name}
        fill
        sizes="260px"
        className="object-cover scale-[1.7] origin-center"
        priority={size !== "footer"}
      />
    </span>
  );
}
