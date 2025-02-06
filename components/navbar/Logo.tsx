import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <h2
      onClick={(e) => router.push("/")}
      className="hidden md:block cursor-pointer"
    >
      Logo
    </h2>
  );
};

export default Logo;
