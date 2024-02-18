"use client";

import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useRegisterModal } from "@/hooks/useRegisterModal";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string().min(1, "Name is required"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (
    data: z.infer<typeof formSchema>,
  ) => {
    try {
      console.log(form.getFieldState("username").error);
      setIsLoading(true);
      await axios.post("/api/register", data);
      registerModal.onClose();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      title="Welcome to Rental Agency"
      description="Create an account"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    className={`${
                      form.getFieldState("username")
                        .error &&
                      "border-destructive outline-destructive focus-visible:ring-offset-rose-500 focus-visible:ring-0"
                    }`}
                    placeholder="rental.agency"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className={`${
                      form.getFieldState("email").error &&
                      "border-destructive outline-destructive focus-visible:ring-offset-rose-500 focus-visible:ring-0"
                    }`}
                    placeholder="rental.agency@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className={`${
                      form.getFieldState("password")
                        .error &&
                      "border-destructive outline-destructive focus-visible:ring-offset-rose-500 focus-visible:ring-0"
                    }`}
                    type="password"
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button
              size={"lg"}
              disabled={isLoading}
              type="submit"
            >
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Create User
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </Modal>
  );
};

export default RegisterModal;
