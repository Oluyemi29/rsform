import { AdapterUser } from "next-auth/adapters";

export interface UserProps {
  _id: string;
  email: string;
  verifyCode: string;
  role: string;
  createdAt: Date;
  emailVerified: Date | null;
  id: string;
  name : string | null | undefined;
  image : string | null | undefined;
}
