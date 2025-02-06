"use client";

import * as z from "zod";
import { useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import { useLoginModal } from "@/hooks/useLoginModal";
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
import { useRouter } from "next/navigation";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import { useRegisterModal } from "@/hooks/useRegisterModal";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

const LoginModal = () => {
  const router = useRouter();
  const { toast } = useToast();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [isLoading, setIsLoading] = useState(false);

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const callBack = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      if (callBack?.ok) {
        toast({
          title: "Logged in",
          description: "You are now logged in",
          variant: "success",
        });
        router.refresh();
        loginModal.onClose();
      }
      if (callBack?.error) {
        throw new Error(callBack?.error as string);
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: `${error}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Welcome back!"
      description="Log in to your account"
    >
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          autoComplete="off"
          onSubmit={form.handleSubmit(onSubmit)}
        >
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
              Log in
            </Button>
          </DialogFooter>
        </form>
        <div className="flex flex-col gap-4 my-2">
          <Button
            variant={"ghost"}
            size={"lg"}
            onClick={(e) => {
              e.preventDefault();
              signIn("github");
            }}
          >
            <AiFillGithub className="mr-2" />
            Sign in with Github
          </Button>
          <Button
            variant={"ghost"}
            size={"lg"}
            onClick={(e) => {
              e.preventDefault();
              signIn("google");
            }}
          >
            <AiOutlineGoogle className="mr-2" />
            Sign in with Google
          </Button>
          <div>
            <p>
              Don&apos;t have an account?{" "}
              <span
                className="text-primary cursor-pointer hover:underline"
                onClick={toggle}
              >
                Sign up
              </span>
            </p>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default LoginModal;
