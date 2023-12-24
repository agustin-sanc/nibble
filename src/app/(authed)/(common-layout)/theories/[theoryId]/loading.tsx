import { Skeleton } from "@/app/_common/components/skeleton";

const Loading = () => (
  <div className="flex h-full w-full flex-col gap-2 p-8">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="mt-5 h-10 w-[60%]" />
    <Skeleton className="h-[150px] w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="mt-5 h-10 w-[50%]" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-[150px] w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
);

export default Loading;
