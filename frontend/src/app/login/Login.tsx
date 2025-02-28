"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/useAuth";

// Define a Zod schema for the login form.
const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email address" }),
  password: z.string().nonempty({ message: "Password is required" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-center text-blue-600 mb-6">Log in</h2>
        {loginMutation.isError && (
          <p className="text-red-500 text-center mb-4">
            Invalid credentials. Please try again.
          </p>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>
        <div className="flex items-center mb-6">
          <input
            id="rememberMe"
            type="checkbox"
            {...register("rememberMe")}
            className="mr-2"
          />
          <label htmlFor="rememberMe" className="text-gray-700">
            Remember Me
          </label>
        </div>
        <StyledButton type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Logging in..." : "Log in"}
        </StyledButton>
      </form>
    </div>
  );
}

// A styled button that combines Tailwind CSS utility classes with styled-components.
const StyledButton = styled.button`
  @apply w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700;
`;
