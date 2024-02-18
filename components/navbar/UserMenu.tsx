"use client";

import { Menu } from "lucide-react";
import { signOut } from "next-auth/react";

import Avatar from "@/components/Avatar";
import MenuItem from "./MenuItem";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export type UserMenuProps = {
  currentUser: User | null;
};

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

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
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            ) : (
              <>
                <MenuItem label="Properties" onClick={() => {}} />
                <MenuItem label="Reservations" onClick={() => {}} />
                <hr />
                <MenuItem
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
