"use client";

import * as React from "react";

import Logo from "./Logo";
import UserMenu from "./UserMenu";
import SearchBar from "./Search";
import Container from "../Container";

export function Navbar() {
  return (
    <div className="z-10 shadow-sm w-full">
      <div className="py-3 border-x-[1px]">
        <Container>
          <div className="flex items-center justify-between">
            <Logo />
            <SearchBar />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
}
