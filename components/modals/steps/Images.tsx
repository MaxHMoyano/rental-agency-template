import ImageUpload from "@/components/inputs/ImageUpload";

export interface ImagesStepProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const ImagesStep = ({ value, onChange }: ImagesStepProps) => {
  return (
    <div>
      <ImageUpload value={value} onChange={onChange} />
    </div>
  );
};

export default ImagesStep;
