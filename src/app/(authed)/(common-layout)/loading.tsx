import { Skeleton } from "@/app/_common/components/skeleton";

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
      <Skeleton className="h-10 w-[75%]" />
      <Skeleton className="mt-5 h-10 w-[45%]" />

      <div className="mt-5 flex flex-row justify-between gap-2">
        <Skeleton className="h-[150px] w-[49%]" />
        <Skeleton className="h-[150px] w-[49%]" />
      </div>

      <div className="mt-4 flex flex-row justify-between gap-2">
        <Skeleton className="h-[150px] w-[49%]" />
      </div>

      <Skeleton className="mt-5 h-10 w-[40%]" />

      <div className="mt-5 flex flex-row justify-between gap-2">
        <Skeleton className="h-[150px] w-[49%]" />
        <Skeleton className="h-[150px] w-[49%]" />
      </div>
    </div>
  </div>
);

export default Loading;
