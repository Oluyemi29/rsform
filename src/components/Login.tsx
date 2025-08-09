"use client";
import { Button, Card, Input } from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    email: z.email(),
    password: z.string().min(4, { message: "Minimum of 4 characters" }),
  });
  type formSchemaType = z.infer<typeof formSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<formSchemaType>({
    resolver: zodResolver(formSchema),
  });
  const submit = async (value: formSchemaType) => {
    try {
      setLoading(true);
      const { email, password } = value;
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (response?.error) {
        if (response.error.includes("No account")) {
          toast.error("Email not found. Please register first.");
        } else if (response.error.includes("No credential")) {
          toast.error("No credential found");
        } else if (response.error.includes("All fields")) {
          toast.error("All fields are required");
        } else if (response.error.includes("Incorrect password")) {
          toast.error("Password is incorrect. Try again.");
        } else {
          toast.error("Something went wrong. Please try again.");
        }
        return;
      } else {
        toast.success("Login successfully");
        return router.push("/admin");
      }
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-row justify-center bg-white pt-10">
      <Card className="lg:w-2/6 md:w-4/6 p-5 w-full h-[28rem] overflow-y-auto">
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
        <p className="text-center text-medium text-rsdeep/80">Login</p>
        <form
          onSubmit={handleSubmit(submit)}
          className="flex flex-col mt-10 gap-5"
        >
          <Input
            label={"Email"}
            placeholder="Email"
            type="Email"
            {...register("email")}
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email}
          />
          <Input
            label={"Password"}
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            endContent={
              showPassword ? (
                <FaEyeSlash
                  size={28}
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                />
              ) : (
                <FaEye
                  size={28}
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                />
              )
            }
            {...register("password")}
            errorMessage={errors.password?.message}
            isInvalid={!!errors.password}
          />
          {loading ? (
            <Button
              type="button"
              isLoading
              disabled
              className="text-white w-full mt-16 bg-rsdeep/65 "
            >
              Processing...
            </Button>
          ) : (
            <Button type="submit" className="text-white mt-16 bg-rsdeep w-full">
              Login
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
};

export default Login;
