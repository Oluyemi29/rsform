"use client";
import { DeleteIssue } from "@/app/api/Controller";
import { Button, Card } from "@heroui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface MembersInfoProps {
  allMembers:
    | {
        _id: string;
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
        createdAt: string;
        updatedAt: string;
        __v: number;
      }
    | undefined;
}
const IssueInfo = ({ allMembers }: MembersInfoProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  //   const { data: session } = useSession();

  const handleDelete = async (id: string | undefined) => {
    try {
      setLoading(true);
      if (!id) {
        return toast.error("All fields are required");
      }
      const response = await DeleteIssue(id);
      if (response.success) {
        toast.success(response.message);
        return router.push("/admin");
      } else {
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-row justify-center bg-white pt-10">
      <Card className="lg:w-2/6 md:w-4/6 p-5 w-full h-[28rem] overflow-y-auto no-scrollbar flex flex-col gap-5">
        <p className="text-center text-rsdeep">Issue Info</p>

        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Name</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.name}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Company Name</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.companyName}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Company Number</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.companyNumber}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Battalion Council</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.battalionCouncil}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Divisional Council</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.divisionalCouncil}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Regional Council</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.regionalCouncil}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Phone Number</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.phone}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Rank</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.rank}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-rsdeep text-[0.7rem]">Issue description</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.description}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Year of joining RS</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.yearjoinRs}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Id card</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.idcard}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Basic 1</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.basic1 ? "YES" : "NO"}
          </p>
        </div>
        {allMembers?.basic1 && (
          <div className="flex flex-row justify-between items-center">
            <p className="text-rsdeep text-[0.7rem]">Basic 1 Year</p>
            <p className="text-rsdeep text-[0.7rem] font-semibold">
              {allMembers?.basic1year}
            </p>
          </div>
        )}
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Basic 2</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.basic2 ? "YES" : "NO"}
          </p>
        </div>
        {allMembers?.basic2 && (
          <div className="flex flex-row justify-between items-center">
            <p className="text-rsdeep text-[0.7rem]">Basic 2 Year</p>
            <p className="text-rsdeep text-[0.7rem] font-semibold">
              {allMembers?.basic2year}
            </p>
          </div>
        )}
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Basic 3</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.basic3 ? "YES" : "NO"}
          </p>
        </div>
        {allMembers?.basic3 && (
          <div className="flex flex-row justify-between items-center">
            <p className="text-rsdeep text-[0.7rem]">Basic 3 Year</p>
            <p className="text-rsdeep text-[0.7rem] font-semibold">
              {allMembers?.basic3year}
            </p>
          </div>
        )}
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Advance</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.advance ? "YES" : "NO"}
          </p>
        </div>
        {allMembers?.advance && (
          <div className="flex flex-row justify-between items-center">
            <p className="text-rsdeep text-[0.7rem]">Advance Year</p>
            <p className="text-rsdeep text-[0.7rem] font-semibold">
              {allMembers?.advanceyear}
            </p>
          </div>
        )}
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">Leadership</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.leadership ? "YES" : "NO"}
          </p>
        </div>
        {allMembers?.leadership && (
          <div className="flex flex-row justify-between items-center">
            <p className="text-rsdeep text-[0.7rem]">Leadership Year</p>
            <p className="text-rsdeep text-[0.7rem] font-semibold">
              {allMembers?.leadershipyear}
            </p>
          </div>
        )}
        <div className="flex flex-row justify-between items-center">
          <p className="text-rsdeep text-[0.7rem]">National Provost</p>
          <p className="text-rsdeep text-[0.7rem] font-semibold">
            {allMembers?.nationalProvost ? "YES" : "NO"}
          </p>
        </div>
        {allMembers?.nationalProvost && (
          <div className="flex flex-row justify-between items-center">
            <p className="text-rsdeep text-[0.7rem]">Nation Provost Year</p>
            <p className="text-rsdeep text-[0.7rem] font-semibold">
              {allMembers?.nationalProvostyear}
            </p>
          </div>
        )}
        <div className="flex flex-row justify-center items-center">
          {loading ? (
            <Button isLoading disabled className="bg-red-700/65 text-white">
              Deleting Member...
            </Button>
          ) : (
            <Button
              onPress={() => handleDelete(allMembers?._id)}
              className="bg-red-700 text-white"
            >
              Delete This Member
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default IssueInfo;
