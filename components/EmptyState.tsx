"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { Heading } from "./ui/heading";

interface EmptyStateProps {
  title?: string;
  description?: string;
  showReset?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No results found",
  description = "Try a different search query.",
  showReset = false,
}) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 items-center justify-center h-[50vh]">
      <Heading title={title} subtitle={description} center />
      {showReset && (
        <Button onClick={() => router.push("/")} variant={"outline"}>
          Reset all filters
        </Button>
      )}
    </div>
  );
};
