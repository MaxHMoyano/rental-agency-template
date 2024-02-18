"use client";

import {
  LuBuilding2,
  LuTrees,
  LuMountain,
  LuPalmtree,
  LuThermometerSnowflake,
} from "react-icons/lu";

import Category from "../Category";
import { usePathname, useSearchParams } from "next/navigation";

export const CATEGORIES = [
  {
    label: "Urban",
    icon: LuBuilding2,
    description: "Around cities or towns.",
  },
  {
    label: "Forests",
    icon: LuTrees,
    description: "Around forests and nature.",
  },
  {
    label: "Mountains",
    icon: LuMountain,
    description: "Around mountains.",
  },
  {
    label: "Beach",
    icon: LuPalmtree,
    description: "Caribean style.",
  },
  {
    label: "Winter",
    icon: LuThermometerSnowflake,
    description: "To enjoy a coffe and skiing.",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const pathname = usePathname();

  const category = params.get("category");
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-row justify-center items-center gap-10 overflow-x-auto">
      {CATEGORIES.map((c) => (
        <Category key={c.label} {...c} selected={category === c.label} />
      ))}
    </div>
  );
};

export default Categories;
