import React, { cloneElement, type ReactElement } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

type SidePanelItemProps = {
  href: string;
  icon: ReactElement;
  label: string;
  arrow?: boolean;
};

const SidePanelItem = ({
  href,
  icon,
  label,
  arrow = false,
}: SidePanelItemProps) => {
  const router = useRouter();

  return (
    <Link href={href}>
      <div
        className={`m-3 mb-0 flex items-center justify-between gap-2 rounded p-2 font-medium hover:bg-white ${
          router.pathname === href && "bg-white text-blue-500"
        }`}
      >
        <div className="flex items-center gap-2">
          {icon &&
            cloneElement(icon, {
              color: router.pathname === href ? "#3F83F8" : "#9CA3AF",
              size: 20,
            })}

          {label}
        </div>

        {arrow && (
          <ChevronRight
            color={`${router.pathname === href ? "#3F83F8" : "#9CA3AF"}`}
            size={20}
          />
        )}
      </div>
    </Link>
  );
};

export default SidePanelItem;
