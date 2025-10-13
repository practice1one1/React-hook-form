import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { customZodResolver } from "../utils/customZodResolver.js";

const zodRefineFormSchema = z
  .object({
    password: z
      .string()
      .refine((value) => value.length >= 5, {
        error: "Password should have atleast 5 characters",
        abort: true, // the 2nd refine() is not run if this fails
      })
      .refine((value) => value.length <= 50, { error: "Password is too long" }),
    confirmPassword: z.string(),
  })
  .refine(
    (fieldValues) => fieldValues.password === fieldValues.confirmPassword,
    {
      error: "Passwords don't match",
      path: ["confirmPassword"],
    },
  );

export const ZodRefineForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: customZodResolver(zodRefineFormSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log("Submitted", d))}>
        <label>
          Password
          <input type="password" {...register("password")} />
        </label>
        {errors.password && <p role="alert">{errors.password.message}</p>}

        <label>
          Confirm Passowrd
          <input type="password" {...register("confirmPassword")} />
        </label>
        {errors.confirmPassword && (
          <p role="alert">{errors.confirmPassword.message}</p>
        )}

        <input type="submit" />
      </form>
    </>
  );
};
