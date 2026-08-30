import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse bg-[#F0F0F0] rounded-[6px]", className)}
      {...props}
    />
  );
}

export { Skeleton };
