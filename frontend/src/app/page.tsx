"use client";

import Link from "next/link";
import { useCurrentUser } from '@/hooks/useAuth';

export default function Home() {
  const { data: user, isLoading} = useCurrentUser();
  return (
    <div>
      <h1>CVBuilder</h1>
      <Link href={"dashboard"} >Dashboard</Link>
      <div>{!isLoading ? user?.email : null}</div>
    </div>
  );
}
