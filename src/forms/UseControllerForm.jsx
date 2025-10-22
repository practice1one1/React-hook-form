import React from "react";
import { useController, useForm } from "react-hook-form";

export const UseControllerForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (d) => console.log("Submitted", d),
          (err) => console.error("Submit error:", err)
        )}
      >
        <Input type={"text"} control={control} />

        <input type="submit" />
      </form>
    </>
  );
};

const Input = ({ type, control }) => {
  const { field, fieldState, formState } = useController({
    name: "aa",
    control,
    rules: { required: "This field is required" },
    defaultValue: "aa default",
  });

  console.log(field.value);

  return <input type={type} {...field} />;
};
