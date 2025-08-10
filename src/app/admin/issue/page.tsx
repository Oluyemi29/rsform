import IssueDashboard from "@/components/IssueDashboard";
import ConnectDB from "@/connect/connection";
import IssueDetails from "@/model/issueSchema";
import { Types } from "mongoose";
import { Metadata } from "next";
import { unstable_noStore as noStore } from "next/cache";
import React from "react";

export const metadata: Metadata = {
  title: "Admin page",
};
interface MembersInfoProps {
  _id: Types.ObjectId;
  description: string;
  phone: string;
  name: string;
  companyNumber: string;
  companyName: string;
  battalionCouncil: string;
  divisionalCouncil: string;
  regionalCouncil: string;
  idcard: string;
  rank: string;
  yearjoinRs: string;
  basic1: boolean;
  basic1year: string;
  basic2: boolean;
  basic2year: string;
  basic3: boolean;
  basic3year: string;
  advance: boolean;
  advanceyear: string;
  leadership: boolean;
  leadershipyear: string;
  nationalProvost: boolean;
  nationalProvostyear: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
type MembersInfoSerialized = Omit<
  MembersInfoProps,
  "_id" | "createdAt" | "updatedAt"
> & {
  _id: string;
  createdAt: string;
  updatedAt: string;
};
const page = async () => {
  noStore()
  await ConnectDB();
  const safeMembers = await IssueDetails.find({}).lean<MembersInfoProps[]>();

  const allMembers: MembersInfoSerialized[] = safeMembers.map((member) => ({
    ...member,
    _id: member._id.toString(), // Convert ObjectId to string
    createdAt: member.createdAt.toISOString(),
    updatedAt: member.updatedAt.toISOString(),
  }));

  return (
    <div className="w-full">
      <IssueDashboard allMembers={allMembers} />
    </div>
  );
};

export default page;
