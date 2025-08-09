import MemberInfo from "@/components/MemberInfo";
import ConnectDB from "@/connect/connection";
import FormDetails from "@/model/formSchema";
import { Types } from "mongoose";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Each Member",
};
interface MembersInfoProps {
  _id: Types.ObjectId;
  image: string;
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
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  await ConnectDB();
  const member = await FormDetails.findById(id).lean<MembersInfoProps | null>();

  if (!member) {
    return <div>Member not found</div>;
  }

  const safeMember: MembersInfoSerialized = {
    ...member,
    _id: member._id.toString(),
    createdAt: member.createdAt.toISOString(),
    updatedAt: member.updatedAt.toISOString(),
  };
  return (
    <div className="w-full">
      <MemberInfo allMembers={safeMember} />
    </div>
  );
};

export default page;
