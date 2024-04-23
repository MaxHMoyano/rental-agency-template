"use client";

import axios from "axios";
import * as z from "zod";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

import { useRegisterModal } from "@/hooks/useRegisterModal";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Modal } from "@/components/ui/modal";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const RegisterModal = () => {
  const { toast } = useToast();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.post("/api/register", data);
      registerModal.onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Please try again later",
        variant: "destructive",
      });
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
                onClick={toggle}
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
