"use client";
import { Button, Card, Checkbox, Input, Textarea } from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import { Select, SelectItem } from "@heroui/react";
import { IssueDatas } from "@/app/api/Controller";
import toast from "react-hot-toast";
import Link from "next/link";

export const rankList = [
  { key: "Private", label: "Private" },
  { key: "Lance corporal", label: "Lance corporal" },
  { key: "Corporal", label: "Corporal" },
  { key: "Sergeant", label: "Sergeant" },
  { key: "Staff Sargent", label: "Staff Sargent" },
  { key: "Warrant officer", label: "Warrant officer" },
  { key: "Master warrant officer", label: "Master warrant officer" },
  { key: "Lieutenant", label: "Lieutenant" },
  { key: "Full Lieutenant", label: "Full Lieutenant" },
  { key: "Captain", label: "Captain" },
  { key: "Major", label: "Major" },
  { key: "Lt Colonel", label: "Lt Colonel" },
  { key: "Colonel", label: "Colonel" },
  { key: "Brigadier General", label: "Brigadier General" },
  { key: "Major General", label: "Major General" },
  { key: "Lieutenant General", label: "Lieutenant General" },
  { key: "General", label: "General" },
];
export const yearList = [
  { key: "2006", label: "2006" },
  { key: "2007", label: "2007" },
  { key: "2008", label: "2008" },
  { key: "2009", label: "2009" },
  { key: "2010", label: "2010" },
  { key: "2011", label: "2011" },
  { key: "2012", label: "2012" },
  { key: "2013", label: "2013" },
  { key: "2014", label: "2014" },
  { key: "2015", label: "2015" },
  { key: "2016", label: "2016" },
  { key: "2017", label: "2017" },
  { key: "2018", label: "2018" },
  { key: "2019", label: "2019" },
  { key: "2020", label: "2020" },
  { key: "2021", label: "2021" },
  { key: "2022", label: "2022" },
  { key: "2023", label: "2023" },
  { key: "2024", label: "2024" },
];

type issueFormProps = {
  description: string;
  name: string;
  companyNumber: string;
  companyName: string;
  battalionCouncil: string;
  divisionalCouncil: string;
  regionalCouncil: string;
  idcard: string;
  rank: string;
  yearjoinRs: string;
  phone: string;
  basic1: {
    haveIt: boolean;
    year: string;
  };
  basic2: {
    haveIt: boolean;
    year: string;
  };
  basic3: {
    haveIt: boolean;
    year: string;
  };
  advance: {
    haveIt: boolean;
    year: string;
  };
  leadership: {
    haveIt: boolean;
    year: string;
  };
  nationalProvost: {
    haveIt: boolean;
    year: string;
  };
};
const IssueForm = () => {
  const [loading, setLoading] = useState(false);
  const [issueData, setIssueData] = useState<issueFormProps>({
    description: "",
    name: "",
    companyNumber: "",
    companyName: "",
    battalionCouncil: "",
    divisionalCouncil: "",
    regionalCouncil: "",
    idcard: "",
    rank: "",
    yearjoinRs: "",
    phone: "",
    basic1: {
      haveIt: false,
      year: "",
    },
    basic2: {
      haveIt: false,
      year: "",
    },
    basic3: {
      haveIt: false,
      year: "",
    },
    advance: {
      haveIt: false,
      year: "",
    },
    leadership: {
      haveIt: false,
      year: "",
    },
    nationalProvost: {
      haveIt: false,
      year: "",
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "text" || type === "number") {
      setIssueData((prevData) => {
        return {
          ...prevData,
          [name]: value,
        };
      });
    }
  };
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setIssueData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {
        description,
        name,
        battalionCouncil,
        companyName,
        companyNumber,
        divisionalCouncil,
        rank,
        regionalCouncil,
        yearjoinRs,
        advance,
        basic1,
        basic2,
        basic3,
        leadership,
        nationalProvost,
        idcard,
        phone,
      } = issueData;
      if (
        !description ||
        !name ||
        !battalionCouncil ||
        !companyName ||
        !companyNumber ||
        !divisionalCouncil ||
        !rank ||
        !regionalCouncil ||
        !yearjoinRs ||
        !idcard ||
        !phone
      ) {
        return toast.error("Some field are required");
      }

      if (advance.haveIt && !advance.year) {
        return toast.error("Kindly select your advance year");
      }
      if (basic1.haveIt && !basic1.year) {
        return toast.error("Kindly select your basic 1 year");
      }
      if (basic2.haveIt && !basic2.year) {
        return toast.error("Kindly select your basic 2 year");
      }
      if (basic3.haveIt && !basic3.year) {
        return toast.error("Kindly select your basic 3 year");
      }
      if (leadership.haveIt && !leadership.year) {
        return toast.error("Kindly select your leadership year");
      }
      if (nationalProvost.haveIt && !nationalProvost.year) {
        return toast.error("Kindly select your National Provost year");
      }

      const request = await IssueDatas(issueData as issueFormProps);
      if (request.success) {
        toast.success(request.message);
        setIssueData((prevData) => {
          return {
            ...prevData,
            description: "",
            phone: "",
            name: "",
            companyNumber: "",
            companyName: "",
            battalionCouncil: "",
            divisionalCouncil: "",
            regionalCouncil: "",
            idcard: "",
            rank: "",
            yearjoinRs: "",
            basic1: {
              haveIt: false,
              year: "",
            },
            basic2: {
              haveIt: false,
              year: "",
            },
            basic3: {
              haveIt: false,
              year: "",
            },
            advance: {
              haveIt: false,
              year: "",
            },
            leadership: {
              haveIt: false,
              year: "",
            },
            nationalProvost: {
              haveIt: false,
              year: "",
            },
          };
        });
      } else {
        toast.error(request.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-row justify-center bg-white pt-20 md:pt-10">
      <Card className="lg:w-2/6 md:w-4/6 p-5 w-full h-[30rem] no-scrollbar overflow-y-auto">
        <div className="w-full flex flex-row justify-between items-center">
          <Image
            src={"/cac.jpg"}
            alt="cac"
            width={40}
            height={40}
            priority
            quality={100}
            unoptimized
            className="w-12 h-12 rounded-full"
          />
          <Image
            src={"/rs.jpg"}
            alt="rs"
            width={40}
            height={40}
            priority
            quality={100}
            unoptimized
            className="w-12 h-12 rounded-full"
          />
        </div>
        <h1 className="text-center text-rsdeep text-medium">
          The Royal Shepherd
        </h1>
        <p className="text-center text-sm text-rsdeep/70">Issue data form</p>
        <p className="text-center text-[0.7rem] text-rsdeep/70">
          Fill the below form and contact this number for follow up on any issue 08069043677 
        </p>

        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          className="w-full mt-5 flex flex-col gap-5"
        >
          <Input
            className="w-full"
            placeholder="Enter your full name"
            label={"Your Full Name"}
            type="text"
            name="name"
            value={issueData.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />
          <Input
            className="w-full"
            placeholder="Enter your company number"
            label={"Your Company Number"}
            type="text"
            name="companyNumber"
            value={issueData.companyNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />
          <Input
            className="w-full"
            placeholder="Enter your company name"
            label={"Your Company Name"}
            type="text"
            name="companyName"
            value={issueData.companyName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />
          <Input
            className="w-full"
            placeholder="Enter your battalion council"
            label={"Your Battalion Council"}
            type="text"
            name="battalionCouncil"
            value={issueData.battalionCouncil}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />
          <Input
            className="w-full"
            placeholder="Enter your divisional council"
            label={"Your Divisional Council"}
            type="text"
            name="divisionalCouncil"
            value={issueData.divisionalCouncil}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />
          <Input
            className="w-full"
            placeholder="Enter your regional council"
            label={"Your Regional Council"}
            type="text"
            name="regionalCouncil"
            value={issueData.regionalCouncil}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />
          <Input
            className="w-full"
            placeholder="Enter your Idcard Number"
            label={"Your Idcard Number"}
            type="number"
            name="idcard"
            value={issueData.idcard}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />
          <Input
            className="w-full"
            placeholder="Enter your actice calling number"
            label={"Your Active Calling Phone Number"}
            type="number"
            name="phone"
            value={issueData.phone}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange(e)
            }
          />

          <Textarea
            className="w-full"
            placeholder="Enter the issue in details"
            label={"Whats the issue all about"}
            name="description"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setIssueData((prevData) => {
                return {
                  ...prevData,
                  description: e.target.value,
                };
              })
            }
          />
          <Select
            className="w-full"
            label="Your Rank"
            placeholder="Select your rank"
            name="rank"
            value={issueData.rank}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleSelectionChange(e)
            }
          >
            {rankList.map((eachRank) => (
              <SelectItem key={eachRank.key}>{eachRank.label}</SelectItem>
            ))}
          </Select>
          <Select
            className="w-full"
            label="Year of joining RS"
            placeholder="Select year of joining RS"
            name="yearjoinRs"
            value={issueData.yearjoinRs}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleSelectionChange(e)
            }
          >
            {yearList.map((eachYear) => (
              <SelectItem key={eachYear.key}>{eachYear.label}</SelectItem>
            ))}
          </Select>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col justify-start">
              <p className="text-[0.7rem] text-rsdeep">
                Basic Training Course 1
              </p>
              <Checkbox
                name="basic1"
                type="checkbox"
                checked={issueData.basic1.haveIt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIssueData((prevData) => {
                    return {
                      ...prevData,
                      basic1: { haveIt: e.target.checked, year: "" },
                    };
                  })
                }
                color="default"
              >
                Basic 1
              </Checkbox>
            </div>
            {issueData.basic1.haveIt && (
              <Select
                className="w-full"
                label="Year"
                placeholder="Select the year"
                name="basic1year"
                value={issueData.basic1.year}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setIssueData((prevData) => {
                    prevData.basic1.year = e.target.value;
                    return prevData;
                  });
                }}
              >
                {yearList.map((eachYear) => (
                  <SelectItem key={eachYear.key}>{eachYear.label}</SelectItem>
                ))}
              </Select>
            )}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col justify-start">
              <p className="text-[0.7rem] text-rsdeep">
                Basic Training Course 2
              </p>
              <Checkbox
                name="basic2"
                type="checkbox"
                checked={issueData.basic2.haveIt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIssueData((prevData) => {
                    return {
                      ...prevData,
                      basic2: { haveIt: e.target.checked, year: "" },
                    };
                  })
                }
                defaultSelected={false}
                color="default"
              >
                Basic 2
              </Checkbox>
            </div>
            {issueData.basic2.haveIt && (
              <Select
                className="w-full"
                label="Year"
                placeholder="Select the year"
                name="basic2year"
                value={issueData.basic2.year}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setIssueData((prevData) => {
                    prevData.basic2.year = e.target.value;
                    return prevData;
                  });
                }}
              >
                {yearList.map((eachYear) => (
                  <SelectItem key={eachYear.key}>{eachYear.label}</SelectItem>
                ))}
              </Select>
            )}
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col justify-start">
              <p className="text-[0.7rem] text-rsdeep">
                Basic Training Course 3
              </p>
              <Checkbox
                name="basic3"
                type="checkbox"
                checked={issueData.basic3.haveIt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIssueData((prevData) => {
                    return {
                      ...prevData,
                      basic3: { haveIt: e.target.checked, year: "" },
                    };
                  })
                }
                defaultSelected={false}
                color="default"
              >
                Basic 3
              </Checkbox>
            </div>
            {issueData.basic3.haveIt && (
              <Select
                className="w-full"
                label="Year"
                placeholder="Select the year"
                name="basic3year"
                value={issueData.basic3.year}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setIssueData((prevData) => {
                    prevData.basic3.year = e.target.value;
                    return prevData;
                  });
                }}
              >
                {yearList.map((eachYear) => (
                  <SelectItem key={eachYear.key}>{eachYear.label}</SelectItem>
                ))}
              </Select>
            )}
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col justify-start">
              <p className="text-[0.7rem] text-rsdeep">Advance Course</p>
              <Checkbox
                name="advance"
                checked={issueData.advance.haveIt}
                type="checkbox"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIssueData((prevData) => {
                    return {
                      ...prevData,
                      advance: { haveIt: e.target.checked, year: "" },
                    };
                  })
                }
                defaultSelected={false}
                color="default"
              >
                Advance
              </Checkbox>
            </div>
            {issueData.advance.haveIt && (
              <Select
                className="w-full"
                label="Year"
                placeholder="Select the year"
                name="advanceyear"
                value={issueData.advance.year}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setIssueData((prevData) => {
                    prevData.advance.year = e.target.value;
                    return prevData;
                  });
                }}
              >
                {yearList.map((eachYear) => (
                  <SelectItem key={eachYear.key}>{eachYear.label}</SelectItem>
                ))}
              </Select>
            )}
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col justify-start">
              <p className="text-[0.7rem] text-rsdeep">Leadership Course</p>
              <Checkbox
                name="leadership"
                type="checkbox"
                checked={issueData.leadership.haveIt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIssueData((prevData) => {
                    return {
                      ...prevData,
                      leadership: { haveIt: e.target.checked, year: "" },
                    };
                  })
                }
                defaultSelected={false}
                color="default"
              >
                Leadership
              </Checkbox>
            </div>
            {issueData.leadership.haveIt && (
              <Select
                className="w-full"
                label="Year"
                placeholder="Select the year"
                name="leadershipyear"
                value={issueData.leadership.year}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setIssueData((prevData) => {
                    prevData.leadership.year = e.target.value;
                    return prevData;
                  });
                }}
              >
                {yearList.map((eachYear) => (
                  <SelectItem key={eachYear.key}>{eachYear.label}</SelectItem>
                ))}
              </Select>
            )}
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col justify-start">
              <p className="text-[0.7rem] text-rsdeep">National Provost</p>
              <Checkbox
                name="nationalProvost"
                type="checkbox"
                checked={issueData.nationalProvost.haveIt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIssueData((prevData) => {
                    return {
                      ...prevData,
                      nationalProvost: { haveIt: e.target.checked, year: "" },
                    };
                  })
                }
                defaultSelected={false}
                color="default"
              >
                National
              </Checkbox>
            </div>
            {issueData.nationalProvost.haveIt && (
              <Select
                className="w-full"
                label="Year"
                placeholder="Select the year"
                name="nationalProvostyear"
                value={issueData.nationalProvost.year}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  setIssueData((prevData) => {
                    prevData.nationalProvost.year = e.target.value;
                    return prevData;
                  });
                }}
              >
                {yearList.map((eachYear) => (
                  <SelectItem key={eachYear.key}>{eachYear.label}</SelectItem>
                ))}
              </Select>
            )}
          </div>
          {loading ? (
            <Button
              className="bg-rsdeep/55 text-white mt-20"
              type="button"
              isLoading
              disabled
            >
              Submiting...
            </Button>
          ) : (
            <Button className="bg-rsdeep text-white mt-20" type="submit">
              Submit
            </Button>
          )}
        </form>
        <Link href={"/contact"} className="text-center mt-3 text-rsdeep ">
          <p className="text-[0.9rem]">Contact Admin</p>
        </Link>
      </Card>
    </div>
  );
};

export default IssueForm;
