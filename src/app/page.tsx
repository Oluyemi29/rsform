import Registration from "@/components/Registration";
import SkeletonLoading from "@/components/Skeleton";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Registration",
};

export default function Home() {
  return (
    <div className="w-full">
      <Suspense fallback={<SkeletonLoading />}>
        <Registration />
      </Suspense>
    </div>
  );
}
