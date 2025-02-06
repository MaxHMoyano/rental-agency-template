interface HeadingProps {
  title: string;
  subtitle: string;
  center?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center = false,
}) => {
  return (
    <div className={`${center ? "text-center" : ""}`}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-md text-gray-500">{subtitle}</p>
    </div>
  );
};
