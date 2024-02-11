"use client";

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="text-sm px-5 py-3 font-semibold hover:bg-accent"
    >
      {label}
    </div>
  );
};

export default MenuItem;
