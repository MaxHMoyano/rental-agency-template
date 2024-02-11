"use client";

import { Menu } from "lucide-react";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <div
        onClick={toggleMenu}
        className="cursor-pointer p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition"
      >
        <div className="flex flex-row items-center justify-between gap-2">
          <Menu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
        {isOpen && (
          <div className="absolute rounded-md shadow-md w-[40vw] md:w-[20vw] bg-white overflow-hidden right-0 top-14 text-sm">
            <div className="flex flex-col cursor-pointer">
              <>
                <MenuItem label="Login" onClick={() => {}} />
                <MenuItem label="Sign up" onClick={() => {}} />
              </>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
