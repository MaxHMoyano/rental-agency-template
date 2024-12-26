"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
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
import PriceStep from "./steps/Price";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Form } from "../ui/form";

const formSchema = z.object({
  category: z.string().min(1),
  location: z
    .object({
      label: z.string().min(1),
      value: z.string().min(1),
      flag: z.string().min(1),
      latlng: z.array(z.number()),
      region: z.string().min(1),
    })
    .optional(),
  information: z.object({
    guestCount: z.number(),
    roomCount: z.number(),
    bathroomCount: z.number(),
    title: z.string().min(1),
    description: z.string().min(1),
  }),
  imageSrc: z.string().nullable().optional(),
  price: z.number(),
});

const RentModal = () => {
  const rentModal = useRentModal();
  const { toast } = useToast();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      information: {
        guestCount: 1,
        roomCount: 1,
        bathroomCount: 1,
        title: "",
        description: "",
      },
      imageSrc: null,
      price: 1,
    },
  });

  const category = form.watch("category");
  const location = form.watch("location");
  const information = form.watch("information");
  const price = form.watch("price");
  const imageSrc = form.watch("imageSrc");

  const onPrevious = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
    console.error(form.formState.errors);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true);
      const listing = {
        title: data.information.title,
        description: data.information.description,
        category: data.category,
        location: data.location,
        price: data.price,
        guestCount: data.information.guestCount,
        roomCount: data.information.roomCount,
        bathroomCount: data.information.bathroomCount,
        imageSrc: data.imageSrc,
      };
      const response = await axios.post("/api/listings", listing);
      if (response.status !== 200) {
        throw new Error("Error creating listing");
      }
      toast({
        title: "Property created",
        description: "Your property has been created",
        variant: "success",
      });
      form.reset();
      setStep(STEPS.CATEGORY);
      rentModal.onClose();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `${error}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Create a property to rent"
      description="Follow the steps"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
    >
      <Form {...form}>
        <form autoComplete="off" onSubmit={form.handleSubmit(onSubmit)}>
          {step === STEPS.CATEGORY && (
            <CategoryStep
              selected={category}
              onClick={(cat) => {
                form.setValue("category", cat, {
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
              onChange={(v) => {
                form.setValue("location", v, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              }}
            />
          )}
          {step === STEPS.INFORMATION && (
            <InformationStep
              information={information}
              onChange={(i) =>
                form.setValue("information", i, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                })
              }
            />
          )}
          {step === STEPS.IMAGES && (
            <ImagesStep
              value={imageSrc}
              onChange={(v) =>
                form.setValue("imageSrc", v, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                })
              }
            />
          )}
          {step === STEPS.PRICE && (
            <PriceStep
              value={price}
              onChange={(v) =>
                form.setValue("price", v, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                })
              }
            />
          )}
          <div className="flex flex-row justify-between items-center mt-5">
            {step !== STEPS.CATEGORY && (
              <Button
                type="button"
                variant={"secondary"}
                className="w-2/5 flex gap-1 items-center hover:bg-accent-foreground hover:text-accent"
                onClick={onPrevious}
              >
                <ArrowLeft /> Back
              </Button>
            )}
            {step !== STEPS.PRICE && (
              <Button
                type="button"
                className={`
                    w-2/5 flex items-center gap-1
                    ${step === STEPS.CATEGORY ? "flex-1" : ""}
                  `}
                onClick={onNext}
              >
                <>
                  Next
                  <ArrowRight />
                </>
              </Button>
            )}
            {step === STEPS.PRICE && (
              <Button size={"lg"} disabled={isSubmitting} type="submit">
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Property
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default RentModal;
