import { Skeleton } from "@/app/_general/components/skeleton";

const Loading = () => (
  <div className="flex h-full w-full p-8">
    <div className="flex w-1/2 flex-col gap-2 pr-7">
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="mt-5 h-[150px] w-auto" />

      <Skeleton className="mt-5 h-10 w-auto" />
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="h-10 w-auto" />

      <Skeleton className="mt-4 h-10 w-auto" />
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="h-10 w-auto" />
    </div>

    <div className="flex w-1/2 flex-col gap-2">
      <Skeleton className="h-10 w-auto" />
      <Skeleton className="mt-5 h-[500px]" />

      <div className="mt-5 flex flex-row justify-between gap-2">
        <Skeleton className="h-10 w-[70%]" />
        <Skeleton className="h-10 w-[28%]" />
      </div>
    </div>
  </div>
);

export default Loading;
