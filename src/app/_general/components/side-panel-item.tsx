import React, { cloneElement, type ReactElement } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type SidePanelItemProps = {
  href: string;
  icon: ReactElement;
  label: string;
};

const SidePanelItem = ({ href, icon, label }: SidePanelItemProps) => {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <div
        className={`m-3 mb-0 flex items-center justify-between gap-2 rounded p-2 font-medium hover:bg-white dark:hover:bg-gray-900 ${
          pathname === href &&
          "bg-gray-200 dark:bg-gray-900 dark:hover:bg-gray-700"
        }`}
      >
        <div className="flex items-center gap-2">
          {icon &&
            cloneElement(icon, {
              size: 20,
            })}

          {label}
        </div>
      </div>
    </Link>
  );
};

export default SidePanelItem;
