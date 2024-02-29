"use client";

import { useState } from "react";
import { LuArrowLeft, LuArrowRight, LuPlusCircle } from "react-icons/lu";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { STEPS } from "@/constants/rent-steps";
import { Modal } from "@/components/ui/modal";
import { useRentModal } from "@/hooks/useRentModal";
import CategoryStep from "./steps/Category";
import LocationStep from "./steps/Location";
import InformationStep from "./steps/Information";
import ImagesStep from "./steps/Images";
import DescriptionStep from "./steps/Description";
import PriceStep from "./steps/Price";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  category: z.string().min(1),
  location: z
    .object({
      label: z.string().min(1),
      value: z.string().min(1),
      flag: z.string().min(1),
      latlng: z.array(z.number()).min(2).max(2),
      region: z.string().min(1),
    })
    .optional(),
  guestCount: z.number(),
  roomCount: z.number(),
  bathroomCount: z.number(),
  price: z.number(),
  title: z.string().min(1),
  description: z.string().min(1),
  imageSrc: z.string(),
});

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  // const location = watch("location");
  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const onPrevious = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = () => {
    if (step !== STEPS.PRICE) {
      onNext();
      console.log(getValues("location"));
    }
  };

  return (
    <Modal
      title="Create a property to rent"
      description="Follow the steps"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
    >
      {step === STEPS.CATEGORY && (
        <CategoryStep
          selected={category}
          onClick={(cat) => {
            setValue("category", cat, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            });
          }}
        />
      )}
      {step === STEPS.LOCATION && (
        <LocationStep
          value={location}
          onChange={(v) => setValue("location", v)}
        />
      )}
      {step === STEPS.INFORMATION && <InformationStep />}
      {step === STEPS.IMAGES && <ImagesStep />}
      {step === STEPS.DESCRIPTION && <DescriptionStep />}
      {step === STEPS.PRICE && <PriceStep />}
      <div className="flex flex-row justify-between items-center mt-5">
        {step !== STEPS.CATEGORY && (
          <Button
            type="button"
            variant={"secondary"}
            className="w-2/5 flex gap-1 items-center hover:bg-accent-foreground hover:text-accent"
            onClick={onPrevious}
          >
            <LuArrowLeft /> Back
          </Button>
        )}
        <Button
          className={`
            w-2/5 flex items-center gap-1
            ${step === STEPS.CATEGORY ? "flex-1" : ""}
          `}
          onClick={onSubmit}
        >
          {step === STEPS.PRICE ? (
            <>
              Create
              <LuPlusCircle />
            </>
          ) : (
            <>
              Next
              <LuArrowRight />
            </>
          )}
        </Button>
      </div>
    </Modal>
  );
};

export default RentModal;
