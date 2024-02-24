"use client";

import { IconType } from "react-icons";

interface MenuItemProps {
  label: string;
  icon?: IconType;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, icon: Icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="text-sm px-5 py-3 font-semibold hover:bg-accent flex justify-between"
    >
      {label}
      {Icon && <Icon className="text-neutral-500" size={20} />}
    </div>
  );
};

export default MenuItem;
