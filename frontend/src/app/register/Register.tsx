"use client";
import { IRegisterPayload } from "@/types/RegisterTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: IRegisterPayload) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Registration failed");
      }
      return response.json();
    },
    onSuccess: () => {
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000); // Redirect after 2 seconds
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded-md text-center mb-4">
          {successMessage}
        </div>
      )}

      <form
        onSubmit={handleSubmit((data) => mutate(data))}
        className="space-y-4"
      >
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-3 border rounded-md"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            className="w-full p-3 border rounded-md"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            className="w-full p-3 border rounded-md"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full p-3 border rounded-md"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            className="w-full p-3 border rounded-md"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
