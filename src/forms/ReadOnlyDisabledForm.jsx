import React from "react";
import { useForm } from "react-hook-form";

export const ReadOnlyDisabledForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log("Submitted", d))}>
        <input type="text" {...register("name")} readOnly />

        <fieldset disabled>
          <legend>Address</legend>
          <input type="text" {...register("street")} />
          <input type="tel" {...register("contact")} />
        </fieldset>

        <input type="submit" />
      </form>
    </>
  );
};
