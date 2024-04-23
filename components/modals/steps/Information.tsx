import Counter from "@/components/inputs/Counter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type Information = {
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  title: string;
  description: string;
};

export interface InformationStepProps {
  information: Information;
  onChange: (information: Information) => void;
}

const InformationStep = ({ information, onChange }: InformationStepProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="my-2">
        <h2 className="text-xl font-semibold">
          Some information about your place
        </h2>
      </div>
      <Input
        value={information.title}
        onChange={(e) => onChange({ ...information, title: e.target.value })}
        className="my-1 font-semibold text-lg"
        placeholder="Title"
      />
      <hr />
      <div className="grid grid-cols-1 gap-x-5 gap-y-3">
        <Counter
          title="Guests"
          onChange={(value) => onChange({ ...information, guestCount: value })}
          value={information.guestCount}
        />
        <Counter
          title="Rooms"
          onChange={(value) => onChange({ ...information, roomCount: value })}
          value={information.roomCount}
        />
        <Counter
          title="Bathrooms"
          onChange={(value) =>
            onChange({ ...information, bathroomCount: value })
          }
          value={information.bathroomCount}
        />
      </div>
      <hr />
      <Textarea
        value={information.description}
        onChange={(e) =>
          onChange({ ...information, description: e.target.value })
        }
        className="my-2 font-semibold text-lg"
        rows={5}
        placeholder="Tell us more about your place"
      />
    </div>
  );
};

export default InformationStep;
