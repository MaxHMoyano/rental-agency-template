"use client";
import { Search } from "lucide-react";
const SearchBar = () => {
  return (
    <div className="border-[1px] w-full md:w-auto py-2 hover:bg-accent transition cursor-pointer rounded-md">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">Where?</div>
        <div className="hidden sm:block text-sm font-semibold border-x-[1px] px-6 flex-1 text-center">
          When?
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">How many?</div>
          <div className="p-2 text-white rounded-full bg-primary">
            <Search size={15} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
