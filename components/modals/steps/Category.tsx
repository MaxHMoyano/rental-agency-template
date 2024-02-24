import { CATEGORIES, Category } from "@/constants/categories";

interface CategoryStepProps {
  selected?: string;
  onClick: (category: string) => void;
}

const CategoryStep = ({ selected, onClick }: CategoryStepProps) => {
  return (
    <>
      <div className="my-2">
        <h2 className="text-xl font-semibold">
          Pick a category that suits your property
        </h2>
        <span className="text-sm text-neutral-600">
          Choose from the following:
        </span>
      </div>
      <div className="space-y-2">
        {CATEGORIES.map(({ label, icon: Icon, description }) => (
          <div
            key={label}
            onClick={() => onClick(label)}
            className={`transition flex flex-row gap-3 hover:border-primary border-2 cursor-pointer rounded-md p-4
            ${selected === label ? "bg-primary" : ""}
            ${selected === label ? "text-primary-foreground" : "text-neutral-600"}
            ${selected === label ? "hover:bg-indigo-800" : "hover:hover:bg-accent"}
            ${selected === label ? "" : "hover:text-neutral-800"}
            `}
          >
            <Icon />
            <div className="font-semibold">{label}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryStep;
