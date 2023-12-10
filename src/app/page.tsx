"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user)
      user.publicMetadata.isProfessor
        ? router.push("/professors")
        : router.push("/students");
  }, [user, router]);
}
