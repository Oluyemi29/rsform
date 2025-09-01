"use client";
import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
  Input,
  RadioGroup,
  Radio,
  Pagination,
} from "@heroui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import AdminNavbar from "./AdminNavbar";
import { FaFilter } from "react-icons/fa";

interface MembersInfoProps {
  allMembers: {
    _id: string;
    image: string;
    name: string;
    companyNumber: string;
    companyName: string;
    phone: string;
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

interface AllMembers {
  _id: string;
  image: string;
  name: string;
  companyNumber: string;
  companyName: string;
  phone: string;
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

type FilteredBy = {
  key: string;
  label: string;
};

const Dashboard = ({ allMembers }: MembersInfoProps) => {
  const [filteredBy, setFilteredBy] = useState<FilteredBy>({
    key: "name",
    label: "Name",
  });
  const [AllFilteredMembers, setAllFilteredMembers] = useState(allMembers);
  const [currentPage, setCurrentPage] = useState(1);
  const rowPerPage = 10;

  const FilterByList = [
    {
      key: "name-Name",
      label: "Name",
    },
    {
      key: "companyNumber-Company Number",
      label: "Company Number",
    },
    {
      key: "companyName-Company Name",
      label: "Company Name",
    },
    {
      key: "phone-Phone",
      label: "Phone",
    },
    {
      key: "battalionCouncil-Battalion Council",
      label: "Battalion Council",
    },
    {
      key: "divisionalCouncil-Divisional Council",
      label: "Divisional Council",
    },
    {
      key: "regionalCouncil-Regional Council",
      label: "Regional Council",
    },
    {
      key: "idcard-Id card",
      label: "Id card",
    },
    {
      key: "rank-Rank",
      label: "Rank",
    },
    {
      key: "yearjoinRs-Year of Joining Rs",
      label: "Year of Joining Rs",
    },
    {
      key: "basic1-Basic 1",
      label: "Basic 1",
    },
    {
      key: "basic1year-Basic 1 Year",
      label: "Basic 1 Year",
    },
    {
      key: "basic2-Basic 2",
      label: "Basic 2",
    },
    {
      key: "basic2year-Basic 2 Year",
      label: "Basic 2 Year",
    },
    {
      key: "basic3-Basic 3",
      label: "Basic 3",
    },
    {
      key: "basic3year-Basic 3 Year",
      label: "Basic 3 Year",
    },
    {
      key: "advance-Advance",
      label: "Advance",
    },
    {
      key: "advanceyear-Advance Year",
      label: "Advance Year",
    },
    {
      key: "leadership-Leadership",
      label: "Leadership",
    },
    {
      key: "leadershipyear-Leadership Year",
      label: "Leadership Year",
    },
    {
      key: "nationalProvost-National Provost",
      label: "National Provost",
    },
    {
      key: "nationalProvostyear-National Provost Year",
      label: "National Provost Year",
    },
  ];

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const TotalPage = Math.ceil(AllFilteredMembers.length / 10);

  const from = (currentPage - 1) * rowPerPage;
  const to = from + rowPerPage;
  const paginatedMember = AllFilteredMembers.slice(from, to);

  const handleSearch = (e: string) => {
    const key: keyof AllMembers = filteredBy.key as keyof AllMembers;
    if (e) {
      setAllFilteredMembers(
        allMembers.filter((eachFilter) => {
          return eachFilter[key]
            .toString()
            .toLowerCase()
            .includes(e.toLowerCase());
        })
      );
      setCurrentPage(1);
    } else {
      setAllFilteredMembers(allMembers);
    }
  };
  const handleDefault = () => {
    setFilteredBy((prevData) => {
      return {
        ...prevData,
        key: "name",
        label: "Name",
      };
    });
    onClose();
  };
  const handleDone = () => {
    onClose();
  };

  return (
    <div className="w-full">
      <Drawer
        isOpen={isOpen}
        placement="left"
        onOpenChange={onOpenChange}
        onClose={onClose}
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            Drawer Title
          </DrawerHeader>
          <DrawerBody>
            <RadioGroup
              label="Filtered list"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFilteredBy((prevData) => {
                  return {
                    ...prevData,
                    key: e.target.value.split("-")[0] as string,
                    label: e.target.value.split("-").pop() as string,
                  };
                });
                onClose();
              }}
            >
              {FilterByList.map((eachFilterList, index) => {
                return (
                  <Radio key={index} value={eachFilterList.key}>
                    {eachFilterList.label}
                  </Radio>
                );
              })}
            </RadioGroup>
          </DrawerBody>
          <DrawerFooter>
            <Button
              color="default"
              variant="light"
              onPress={() => handleDefault()}
            >
              Default
            </Button>
            <Button color="default" onPress={() => handleDone()}>
              Done
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <div className="flex flex-row my-5 justify-between items-center">
        <h1 className="text-rsdeep text-medium">Admin</h1>
        <Button onPress={() => signOut()} className="bg-red-700 text-white">
          Log out
        </Button>
      </div>
      <AdminNavbar />
      <h1 className="text-center font-semibold my-5 text-rsdeep underline underline-offset-4">
        Registered Members List
      </h1>
      <div className="flex mb-5 flex-row gap-5 items-center w-full">
        <Input
          label={`Search by ${filteredBy.label}`}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleSearch(e.target.value);
          }}
        />
        <FaFilter size={28} onClick={onOpen} className="cursor-pointer" />
      </div>
      <Table
        isStriped
        aria-label="Example static collection table"
        bottomContent={
          <div className="w-full flex flex-row justify-center items-center">
            <Pagination
              initialPage={5}
              page={currentPage}
              onChange={setCurrentPage}
              total={TotalPage}
              color="default"
              showControls
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>IMAGE</TableColumn>
          <TableColumn>NAME</TableColumn>
          <TableColumn>COMPANY NAME</TableColumn>
          <TableColumn>COMPANY NUMBER</TableColumn>
          <TableColumn>BATTALION</TableColumn>
          <TableColumn>DIVISION</TableColumn>
          <TableColumn>REGIONAL</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No registered member currently"}>
          {paginatedMember.map((eachMember, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Image
                    src={eachMember.image}
                    alt="member"
                    width={100}
                    height={100}
                    priority
                    quality={100}
                    className="rounded-full w-12 h-12"
                  />
                </TableCell>
                <TableCell>{eachMember.name}</TableCell>
                <TableCell>{eachMember.companyName}</TableCell>
                <TableCell>{eachMember.companyNumber}</TableCell>
                <TableCell>{eachMember.battalionCouncil}</TableCell>
                <TableCell>{eachMember.divisionalCouncil}</TableCell>
                <TableCell>{eachMember.regionalCouncil}</TableCell>
                <TableCell>
                  <Button
                    as={Link}
                    href={`/admin/${eachMember._id}`}
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

export default Dashboard;
