import { type ReactNode } from "react";

type ContentCardProps = {
  title: string;
  subtitle: string;
  badge?: ReactNode;
  children?: ReactNode;
};

export const ContentCard = ({
  title,
  subtitle,
  badge,
  children,
}: ContentCardProps) => (
  <div className="mb-2 flex w-[48%] flex-col justify-between rounded border p-4">
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {badge}
      </div>

      <p className="pb-5 text-sm">{subtitle}</p>
    </div>

    {children}
  </div>
);
