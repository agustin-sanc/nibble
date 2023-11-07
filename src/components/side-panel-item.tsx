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
        className={`m-3 mb-0 flex items-center justify-between gap-2 rounded p-2 font-medium hover:bg-white ${
          pathname === href && "bg-white text-black"
        }`}
      >
        <div className="flex items-center gap-2">
          {icon &&
            cloneElement(icon, {
              color: pathname === href ? "#000000" : "#9CA3AF",
              size: 20,
            })}

          {label}
        </div>
      </div>
    </Link>
  );
};

export default SidePanelItem;