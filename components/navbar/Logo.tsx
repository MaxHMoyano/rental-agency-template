import Image from "next/image";
const Logo = () => {
  return (
    <Image
      alt="Logo"
      height={100}
      width={100}
      className="hidden md:block cursor-pointer"
      src={"/images/logo.png"}
    />
  );
};

export default Logo;
