"use client";

import axios from "axios";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

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

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input
                    className={`${
                      form.getFieldState("name").error &&
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
                  <Input placeholder="rental.agency@example.com" {...field} />
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
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button size={"lg"} disabled={isLoading} type="submit">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create User
            </Button>
          </DialogFooter>
        </form>
        <div className="flex flex-col gap-4 my-2">
          <Button
            variant={"ghost"}
            size={"lg"}
            onClick={() => {
              signIn("github");
            }}
          >
            <AiFillGithub className="mr-2" />
            Sign in with Github
          </Button>
          <div>
            <p>
              Already have an account?{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={registerModal.onClose}
              >
                Log in
              </span>
            </p>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default RegisterModal;
