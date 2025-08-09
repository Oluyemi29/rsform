import { UserProps } from "./usertype";
import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: UserProps;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: UserProps;
  }
}
