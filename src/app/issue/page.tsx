import IssueForm from "@/components/IssueForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Log issue",
};
const page = async () => {
  return (
    <div className="w-full">
      <IssueForm />
    </div>
  );
};

export default page;
