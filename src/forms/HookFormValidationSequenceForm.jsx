import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const HookFormValidationSequenceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit", //default
    // reValidateMode: 'onChange', //default
    // by default, hook form initially validates form upon first submit attempt then upon each user input
  });

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log("Submitted", d))}>
        <input
          type="text"
          {...register("userId", {
            required: "User ID is mandatory",
            minLength: {
              value: 2,
              message: "Name should have atleast 2 characters",
            },
          })}
        />
        {errors.userId && <p role="alert">{errors.userId.message}</p>}

        <input
          type="password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p role="alert">{errors.password.message}</p>}

        <input
          type="password"
          {...register("confirmPassword", {
            required: "Please confirm password",
            validate: (pwd) => pwd === password || "Passwords don't match",
          })}
        />
        {errors.confirmPassword && (
          <p role="alert">{errors.confirmPassword.message}</p>
        )}

        <input type="submit" />
      </form>
    </>
  );
};
