import { Skeleton } from "@/app/_general/components/skeleton";

const Loading = () => (
  <div className="flex h-full w-full p-8">
    <div className="flex w-1/4 flex-col gap-2 pr-7">
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="mt-5 h-10 w-auto" />
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="h-10 w-auto" />
    </div>

    <div className="flex w-3/4 flex-col gap-2">
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
  </div>
);

export default Loading;
