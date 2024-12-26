import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { LucideIcon } from "lucide-react";

export type CategoryProps = {
  label: string;
  description: string;
  selected?: boolean;
  icon: LucideIcon;
};

const Category = ({ label, selected, icon: Icon }: CategoryProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      {
        skipNull: true,
      },
    );

    router.push(url);
  }, [params, label, router]);
  return (
    <div
      onClick={handleClick}
      className={`
        flex
        flex-col 
        gap-1 
        items-center 
        text-xs
        p-3
        cursor-pointer 
        rounded-md
        transition
        min-w-[80px]
        ${selected ? "bg-primary" : "bg-transparent"}
        ${selected ? "hover:bg-indigo-800" : "hover:bg-accent"}
        ${selected ? "text-primary-foreground" : "text-neutral-600"}
        ${selected ? "font-bold" : "font-semibold"}
      `}
    >
      <Icon size={20} />
      <div>{label}</div>
    </div>
  );
};

export default Category;
