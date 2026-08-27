import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  accent?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export default function SectionHeading({
  accent = "our",
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <h2
        className={cn(
          "font-serif text-[42px] leading-none tracking-[-0.03em] md:text-[56px]",
          dark ? "text-white" : "text-[var(--ink)]"
        )}
      >
        {accent ? (
          <>
            <em className={cn("italic font-normal", dark ? "text-white/70" : "text-[var(--plum)]")}>
              {accent}
            </em>{" "}
            {title}
          </>
        ) : (
          title
        )}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 max-w-xl text-[16px] leading-7",
            dark ? "text-white/55" : "text-[var(--muted)]",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
