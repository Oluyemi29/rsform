"use client";
import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

const AdminNavbar = () => {
  return (
    <div className="flex my-4 flex-row gap-5 justify-center no-scrollbar w-full overflow-x-auto">
      <Button className="bg-rsdeep text-white" as={Link} href="/admin">
        All Member
      </Button>
      <Button className="bg-rsdeep text-white" as={Link} href="/admin/issue">
        All Issue
      </Button>
    </div>
  );
};

export default AdminNavbar;
