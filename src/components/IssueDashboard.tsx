"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@heroui/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import AdminNavbar from "./AdminNavbar";

interface MembersInfoProps {
  allMembers: {
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
  }[];
}
const IssueDashboard = ({ allMembers }: MembersInfoProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-row my-5 justify-between items-center">
        <h1 className="text-rsdeep text-medium">Admin</h1>
        <Button onPress={() => signOut()} className="bg-red-700 text-white">
          Log out
        </Button>
      </div>
      <AdminNavbar />
      <h1 className="text-center font-semibold my-5 text-rsdeep underline underline-offset-4">
        Issue data List
      </h1>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>COMPANY NAME</TableColumn>
          <TableColumn>COMPANY NUMBER</TableColumn>
          <TableColumn>BATTALION</TableColumn>
          <TableColumn>DIVISION</TableColumn>
          <TableColumn>REGIONAL</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No registered member currently"}>
          {allMembers.map((eachMember, index) => {
            return (
              <TableRow key={index}>
                <TableCell>{eachMember.name}</TableCell>
                <TableCell>{eachMember.companyName}</TableCell>
                <TableCell>{eachMember.companyNumber}</TableCell>
                <TableCell>{eachMember.battalionCouncil}</TableCell>
                <TableCell>{eachMember.divisionalCouncil}</TableCell>
                <TableCell>{eachMember.regionalCouncil}</TableCell>
                <TableCell>
                  <Button
                    as={Link}
                    href={`/admin/issue/${eachMember._id}`}
                    className="bg-green-700 text-white"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default IssueDashboard;
