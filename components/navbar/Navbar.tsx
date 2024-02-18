"use client";

import * as React from "react";

import Logo from "./Logo";
import UserMenu from "./UserMenu";
import SearchBar from "./Search";
import { User } from "@prisma/client";
import Categories from "./Categories";

export type NavbarProps = {
  currentUser: User | null;
};

export function Navbar({ currentUser }: NavbarProps) {
  return (
    <div className="z-10 shadow-sm w-full">
      <div className="py-3 border-x-[1px]">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Logo />
            <SearchBar />
            <UserMenu currentUser={currentUser} />
          </div>
        </div>
        <Categories />
      </div>
    </div>
  );
}
