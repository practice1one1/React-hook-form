import React from "react";
import { useFormContext, useForm } from "react-hook-form";
import z from "zod";

export const SignUpForm = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      passowrd: "",
    },
  });

  const onSubmit = (d) => console.log("Submitted", d);
  const onError = (err) => console.log("Submit err", err);
  const checkNameExist = React.useCallback(async (name) => {
    const res = await fetch(
      `https://echo.free.beeceptor.com/username=${name}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    return !res.ok; // manually alter booleans here, as res.ok is always true. Returning false means name doesn't exist ✅
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <fieldset>
        <legend>Sign up</legend>

        <input
          type="text"
          {...register("username", {
            required: "Username is required",
            validate: async (input) => {
              const isExisting = await checkNameExist(input);
              return !isExisting || "Username already exists";
            },
          })}
          placeholder="Username"
        />
      </fieldset>

      <input type="submit" value="Sign Up" />
    </form>
  );
};
