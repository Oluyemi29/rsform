"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonLoading = () => {
  return (
    <div className="w-full flex flex-row justify-center bg-white pt-10">
      <div className="lg:w-2/6 md:w-4/6 p-5 w-full h-96 flex mx-auto flex-col gap-3">
        <Skeleton count={3} />
        <Skeleton count={8} />
        <Skeleton count={2} />
      </div>
    </div>
  );
};

export default SkeletonLoading;
