"use client";

import { CATEGORIES } from "@/constants/categories";
import Category from "../Category";
import { usePathname, useSearchParams } from "next/navigation";

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
