"use client";
import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ToastProvider } from "@heroui/toast";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-center" toastOffset={60} />
      <SessionProvider>{children}</SessionProvider>
    </HeroUIProvider>
  );
};

export default Provider;
