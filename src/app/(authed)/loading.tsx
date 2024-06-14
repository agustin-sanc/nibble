import { Skeleton } from "@/app/_cross/components/skeleton";

const Loading = () => (
  <div className="flex h-full w-full flex-col gap-2 p-3">
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
);

export default Loading;
