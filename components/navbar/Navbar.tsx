"use client";

import * as React from "react";

import Logo from "./Logo";
import UserMenu from "./UserMenu";
import SearchBar from "./Search";

export function Navbar() {
  return (
    <div className="z-10 shadow-sm w-full">
      <div className="py-3 border-x-[1px]">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Logo />
            <SearchBar />
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
