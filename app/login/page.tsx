"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useWixClient } from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

const LoginPage = () => {
  const [mode, setMode] = useState<MODE>(MODE.LOGIN);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      emailCode: "",
    },
  });
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  if (isLoggedIn) {
    router.push("/");
  }

  const { register, handleSubmit, reset } = form;
  const handleNavigate = (path: MODE) => {
    reset();
    setMode(path);
    setError("");
    setMessage("");
  };

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset Your Password"
      : "Verify Your Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
      ? "Register"
      : mode === MODE.RESET_PASSWORD
      ? "Reset"
      : "Verify";

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setError("");
    try {
      let response;
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email: data.email,
            password: data.password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email: data.email,
            password: data.password,
            profile: { nickname: data.username },
          });
          break;
        case MODE.RESET_PASSWORD:
          response = await wixClient.auth.sendPasswordResetEmail(
            data.email,
            window.location.href
          );
          setMessage("Password reset email sent. Check your email.");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: data.emailCode,
          });
          break;
        default:
          break;
      }
      switch (response?.loginState) {
        case LoginState.SUCCESS:
          if (mode === MODE.LOGIN) {
            setMessage("Successful! Login");
          } else if (mode === MODE.REGISTER) {
            setMessage("Successful! Registration");
          } else if (mode === MODE.EMAIL_VERIFICATION) {
            setMessage("Email verification successful");
          }
          const token = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );
          Cookies.set("refreshToken", JSON.stringify(token.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(token);
          router.push("/");
          break;
        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidPassword" ||
            response.errorCode === "invalidEmail"
          ) {
            setError("Invalid email or password");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Email already exists");
          } else if (response.errorCode === "resetPassword") {
            setError("You need to reset your password!");
          } else {
            setError("Something went wrong");
          }
          break;
        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
          break;
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Your account is pending approval");
        default:
          break;
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MaxWidthWrapper className="mt-0 h-[calc(100vh-80px)] flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 w-5/12"
        >
          <h2 className="text-4xl font-semibold mx-auto">{formTitle}</h2>
          {mode === MODE.REGISTER && (
            <FormField
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 border-gray-300"
                      {...register("username")}
                      placeholder="Enter your Username"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {mode !== MODE.EMAIL_VERIFICATION ? (
            <FormField
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...register("email")}
                      className="border-2 border-gray-300"
                      type="email"
                      placeholder="Enter your Email"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormField
              name="emailCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 border-gray-300"
                      {...register("emailCode")}
                      placeholder="Enter your Code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
            <FormField
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="border-2 border-gray-300"
                      {...register("password")}
                      type="password"
                      placeholder="Enter your Password"
                      autoComplete={
                        mode === MODE.LOGIN
                          ? "current-password"
                          : "new-password"
                      }
                      aria-hidden="true"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          {mode === MODE.LOGIN && (
            <div
              className="cursor-pointer underline underline-offset-2 text-sm "
              onClick={() => setMode(MODE.RESET_PASSWORD)}
            >
              Forgot password?
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
            loadingText="loading"
            className="bg-redColor hover:bg-redColor disabled:bg-pink-200 disabled:cursor-not-allowed"
          >
            {buttonTitle}
          </Button>

          {mode === MODE.LOGIN ? (
            <div
              className="cursor-pointer underline underline-offset-2"
              onClick={() => handleNavigate(MODE.REGISTER)}
            >
              {"Don't"} have an account?
            </div>
          ) : mode === MODE.REGISTER ? (
            <div
              className="cursor-pointer underline underline-offset-2"
              onClick={() => handleNavigate(MODE.LOGIN)}
            >
              Already have an account?
            </div>
          ) : mode === MODE.RESET_PASSWORD ? (
            <div
              className="cursor-pointer underline underline-offset-2"
              onClick={() => handleNavigate(MODE.LOGIN)}
            >
              Back to Login
            </div>
          ) : null}
          {error && <div className="text-red-600">{error}</div>}
          {message && <div className="text-green-600">{message}</div>}
        </form>
      </Form>
    </MaxWidthWrapper>
  );
};

export default LoginPage;
