"use client";

import React, { useState } from "react";
import { useForm, Controller, Control } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/useRegister";
import Link from "next/link";
import Image from "next/image";
import { AxiosError } from "axios";

const schema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

type InputFieldProps = {
  label: string;
  type: string;
  name: keyof FormData;
  control: Control<FormData>;
  errors: Record<string, { message?: string }>;
};

const InputField = ({
  label,
  type,
  name,
  control,
  errors,
}: InputFieldProps) => (
  <div>
    <label className="block text-sm font-medium text-gray-900">{label}</label>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <input
          {...field}
          type={type}
          className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 shadow-sm focus:outline-indigo-600"
          autoComplete={type === "password" ? "new-password" : "off"}
        />
      )}
    />
    {errors[name]?.message && (
      <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

const PasswordStrengthMeter = ({ password }: { password: string }) => {
  const strength =
    password.length >= 12 ? "Strong" : password.length >= 8 ? "Medium" : "Weak";
  const color =
    strength === "Strong"
      ? "text-green-600"
      : strength === "Medium"
      ? "text-yellow-600"
      : "text-red-600";
  return password ? (
    <p className={`mt-1 text-sm ${color}`}>Password Strength: {strength}</p>
  ) : null;
};

export default function Register() {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const { isLoading, registerUser } = useRegister();
  const password = watch("password", "");

  const onSubmit = (data: FormData) => {
    setErrorMessage(""); // Reset error message before submitting
    registerUser(data, {
      onSuccess: () => {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      },
      onError: (error: AxiosError<{ message?: string }>) => {
        setErrorMessage(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      },
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          alt="CVBuilder Logo"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          width={50}
          height={50}
          className="mx-auto"
          priority
        />
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create an account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {!!errorMessage && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md text-center mb-4">
            {errorMessage}
          </div>
        )}
        {!!successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded-md text-center mb-4">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <InputField
            label="First Name"
            type="text"
            name="firstName"
            control={control}
            errors={errors}
          />
          <InputField
            label="Last Name"
            type="text"
            name="lastName"
            control={control}
            errors={errors}
          />
          <InputField
            label="Email Address"
            type="email"
            name="email"
            control={control}
            errors={errors}
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            control={control}
            errors={errors}
          />
          <PasswordStrengthMeter password={password} />
          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            control={control}
            errors={errors}
          />
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full h-5 w-5"></span>
            ) : (
              "Sign up"
            )}
          </button>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
