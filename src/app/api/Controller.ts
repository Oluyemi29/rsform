"use server";

import cloudinary from "@/cloud";
import ConnectDB from "@/connect/connection";
import FormDetails from "@/model/formSchema";
import IssueDetails from "@/model/issueSchema";
import User from "@/model/userModel";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

type regDataProps = {
  imageFile: Blob | null;
  imagePreview: string;
  imageSize: string;
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

export const RegDatas = async (regData: regDataProps) => {
  try {
    await ConnectDB();
    const {
      advance,
      basic1,
      basic2,
      basic3,
      battalionCouncil,
      companyName,
      companyNumber,
      divisionalCouncil,
      idcard,
      imageFile,
      leadership,
      name,
      nationalProvost,
      rank,
      regionalCouncil,
      yearjoinRs,
      phone,
    } = regData;
    if (
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
      return {
        success: false,
        message: "All fields are required",
      };
    }

    if (!imageFile) {
      return {
        success: false,
        message: "Image is required",
      };
    }

    const maxSize = 1024 * 1024 * 10;
    if (imageFile?.size > maxSize) {
      return {
        success: false,
        message: "Image size too big",
      };
    }
    const AcceptedFiles = ["image/png", "image/jpeg", "image/jpg"];
    if (!AcceptedFiles.includes(imageFile.type)) {
      return {
        success: false,
        message: "Only png, jpg or jpeg files are allowed",
      };
    }
    const existMember = await FormDetails.findOne({ idcard });
    if (existMember) {
      return {
        success: false,
        message:
          "this idcard already registered, contact admin if theres mix up",
      };
    }

    const ImageUrl = async () => {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "rsform");
      const request = await fetch(
        "https://api.cloudinary.com/v1_1/doqrxgjgy/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const response = await request.json();
      return response.secure_url as string;
    };
    const result = await ImageUrl();
    if (!result) {
      return {
        success: false,
        message: "error when uploading image",
      };
    }

    const members = await FormDetails.create({
      image: result,
      name: name,
      companyNumber: companyNumber,
      companyName: companyName,
      battalionCouncil: battalionCouncil,
      divisionalCouncil: divisionalCouncil,
      regionalCouncil: regionalCouncil,
      idcard: idcard,
      rank: rank,
      yearjoinRs: yearjoinRs,
      phone: phone,
      basic1: basic1.haveIt,
      basic1year: basic1.year,
      basic2: basic2.haveIt,
      basic2year: basic2.year,
      basic3: basic3.haveIt,
      basic3year: basic3.year,
      advance: advance.haveIt,
      advanceyear: advance.year,
      leadership: leadership.haveIt,
      leadershipyear: leadership.year,
      nationalProvost: nationalProvost.haveIt,
      nationalProvostyear: nationalProvost.year,
    });
    if (members) {
      revalidatePath("/admin");
      return {
        success: true,
        message: "registered successfully",
      };
    } else {
      return {
        success: false,
        message: "error when when registering member",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "an error occured",
    };
  }
};

type RegisterProps = {
  email: string;
  password: string;
};
export const RegisterUser = async ({ email, password }: RegisterProps) => {
  try {
    await ConnectDB();
    if (!email || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return {
        success: false,
        message: "User account already exist",
      };
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const register = await User.create({ email, password: hashPassword });
    if (register) {
      return {
        success: true,
        message: "User registered successfully",
      };
    } else {
      return {
        success: false,
        message: "error when registering user",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occureed",
    };
  }
};

export const GetAllMember = async () => {
  try {
    await ConnectDB();
    const allmembers = await FormDetails.find({}).lean();
    return allmembers;
  } catch (error) {
    console.log(error);
  }
};

export const DeleteMembers = async (id: string, image: string) => {
  try {
    const publicId = image.split("/").pop()?.split(".")[0] as string;
    if (!id || !image) {
      return {
        success: false,
        message: "All fields are required",
      };
    }
    await ConnectDB();
    const existMember = await FormDetails.findById(id);
    if (!existMember) {
      return {
        success: false,
        message: "Member not found",
      };
    }

    await cloudinary.uploader.destroy(publicId as string);
    const deleted = await FormDetails.findByIdAndDelete(id);
    if (deleted) {
      revalidatePath("/admin");
      return {
        success: true,
        message: "User deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "An error occured when deleting member",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

export const DeleteIssue = async (id: string) => {
  try {
    if (!id ) {
      return {
        success: false,
        message: "All fields are required",
      };
    }
    await ConnectDB();
    const existMember = await IssueDetails.findById(id);
    if (!existMember) {
      return {
        success: false,
        message: "Issue not found",
      };
    }

    const deleted = await IssueDetails.findByIdAndDelete(id);
    if (deleted) {
      revalidatePath("/admin/issue");
      return {
        success: true,
        message: "Issue deleted successfully",
      };
    } else {
      return {
        success: false,
        message: "An error occured when deleting issue",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occured",
    };
  }
};

type issueDataProps = {
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

export const IssueDatas = async (regData: issueDataProps) => {
  try {
    await ConnectDB();
    const {
      advance,
      basic1,
      basic2,
      basic3,
      battalionCouncil,
      companyName,
      companyNumber,
      divisionalCouncil,
      idcard,
      description,
      leadership,
      name,
      nationalProvost,
      rank,
      regionalCouncil,
      yearjoinRs,
      phone,
    } = regData;
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
      return {
        success: false,
        message: "Some fields are required",
      };
    }

    const issue = await IssueDetails.create({
      description: description,
      name: name,
      companyNumber: companyNumber,
      companyName: companyName,
      battalionCouncil: battalionCouncil,
      divisionalCouncil: divisionalCouncil,
      regionalCouncil: regionalCouncil,
      idcard: idcard,
      rank: rank,
      yearjoinRs: yearjoinRs,
      phone: phone,
      basic1: basic1.haveIt,
      basic1year: basic1.year,
      basic2: basic2.haveIt,
      basic2year: basic2.year,
      basic3: basic3.haveIt,
      basic3year: basic3.year,
      advance: advance.haveIt,
      advanceyear: advance.year,
      leadership: leadership.haveIt,
      leadershipyear: leadership.year,
      nationalProvost: nationalProvost.haveIt,
      nationalProvostyear: nationalProvost.year,
    });
    if (issue) {
      revalidatePath("/admin/issue");
      return {
        success: true,
        message: "Issue submitted successfully",
      };
    } else {
      return {
        success: false,
        message: "error when logging issue",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "an error occured",
    };
  }
};
