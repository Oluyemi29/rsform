import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import User from "@/model/userModel";
import { UserProps } from "../../../../../types/usertype";

const AuthOption: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        if (!credentials) {
          throw new Error("No credential found");
        }
        const { email, password } = credentials;
        if (!email || !password) {
          throw new Error("All fields are required");
        }
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No account found with that email");
        }
        const comparePassword = await bcrypt.compare(
          password,
          user.password as string
        );
        if (!comparePassword) {
          throw new Error("Incorrect password");
        }
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          user.password = undefined;
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as UserProps;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "jwt",
  },
  
};

const handlers = NextAuth(AuthOption);
export { handlers as GET, handlers as POST };
