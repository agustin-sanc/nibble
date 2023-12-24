import { cn } from "@/app/_general/cn";

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("animate-pulse rounded-md bg-primary/10", className)}
    {...props}
  />
);
