import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type SignInFormData = z.infer<typeof formSchema>;
const api = import.meta.env.VITE_API_URL;
const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${api}/auth/signin`, {
        email: data.email,
        password: data.password,
      });
      console.log('data',response.data.name);
      login(response.data.name, response.data.auth_key);
      // You can store token/user info as needed
      // localStorage.setItem("token", response.data.token);

      toast.success("Sign in successful!");
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Sign-in failed. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const email = form.getValues("email");

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast.error("Please enter a valid email address first");
      return;
    }

    try {
      await axios.post("/api/auth/forgot-password", { email });
      toast.success("Password reset email sent. Please check your inbox.");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send password reset email");
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="container-custom mx-auto py-16 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-brand-blue flex justify-center items-center gap-2">
            <LogIn className="h-8 w-8" />
            <span>Welcome Back</span>
          </CardTitle>
          <CardDescription className="text-gray-500">Sign in to your account to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
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
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <button type="button" onClick={handleForgotPassword} className="text-sm text-brand-blue hover:underline">
                          Forgot password?
                        </button>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={togglePasswordVisibility}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                variant="outline"
                type="submit"
                className="w-full mt-4 hover:bg-black text-white flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                <LogIn className="h-5 w-5" />
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          {/* Optional: Remove if not using Google Auth */}
          {/* <div className="mt-6"> ... </div> */}
        </CardContent>

        <CardFooter className="flex flex-col items-center">
          <p className="text-sm text-center text-gray-600 mt-2">
            Don't have an account?{" "}
            <Link to="/signup" className="text-brand-blue hover:underline font-medium">
              Sign up here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignInPage;
