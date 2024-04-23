"use client";

import { Heart, Home, LogIn, LogOut, Map, Menu } from "lucide-react";
import { signOut } from "next-auth/react";

import Avatar from "@/components/Avatar";
import MenuItem from "./MenuItem";
import { useLoginModal } from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRentModal } from "@/hooks/useRentModal";

export type UserMenuProps = {
  currentUser: User | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <div className="cursor-pointer p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition">
            <div className="flex flex-row items-center justify-between gap-2">
              <Menu />
              <div className="hidden md:block">
                <Avatar src={currentUser?.image} />
              </div>
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col cursor-pointer">
            {!currentUser ? (
              <>
                <MenuItem
                  icon={LogIn}
                  label="Login"
                  onClick={loginModal.onOpen}
                />
              </>
            ) : (
              <>
                <MenuItem icon={Map} label="Trips" onClick={() => {}} />
                <MenuItem icon={Heart} label="Favorites" onClick={() => {}} />
                <hr />
                <MenuItem
                  icon={Home}
                  label="Properties"
                  onClick={rentModal.onOpen}
                />
                <hr />
                <MenuItem
                  icon={LogOut}
                  label="Logout"
                  onClick={() => {
                    signOut();
                  }}
                />
              </>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserMenu;
