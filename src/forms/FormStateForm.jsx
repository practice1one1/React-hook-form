import React from "react";
import { useForm } from "react-hook-form";

export const FormStateForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, dirtyFields },
  } = useForm({
    defaultValues: {
      // always provide default values for isDirty to compare
      aa: "x",
      bb: 1,
    },
  });

  console.log(isDirty, dirtyFields);

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log("Submitted", d))}>
        <input
          type="text"
          {...register("aa", {
            pattern: { value: /^x/, message: "Begin with x..." },
          })}
        />
        {errors.aa && <p role="alert">{errors.aa.message}</p>}

        <input
          type="number"
          {...register("bb", {
            max: { value: 5, message: "Not more than 5 allowed" },
          })}
        />
        {errors.bb && <p role="alert">{errors.bb.message}</p>}

        <input type="submit" />
      </form>
    </>
  );
};
