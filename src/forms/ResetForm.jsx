import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  name: "",
  email: "",
  address: "Plot 1, Garden road",
};

export const ResetForm = () => {
  const {
    register,
    handleSubmit,
    formState,
    formState: {
      errors,
      isValid,
      isDirty,
      touchedFields,
      dirtyFields,
      isSubmitSuccessful,
    },
    resetField,
    reset,
    watch,
  } = useForm({
    defaultValues,
  });

  console.log("Field values:", watch());
  console.log("%cTouched fields", "color: lightblue", touchedFields);
  console.log("%cDirty fields", "color: yellow", dirtyFields);
  console.log("%cError fields", "color: red", errors);

  const handleResetErrorFields = useCallback(() => {
    Object.keys(errors).forEach((errorField) => {
      resetField(errorField, {
        keepDirty: true,
        keepTouched: true,
      });
    });
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      console.log("resetted");
      reset(defaultValues);
    }
  }, [formState, reset]); // pass entire form state object as form state is updated in batch

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (d) => console.log("Submitted", d),
          (err) => console.error("Submit error:", err)
        )}
      >
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Please enter at least 2 characters",
            },
          })}
        />
        {errors.name && <p role="alert">{errors.name.message}</p>}

        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            pattern: { value: /@/, message: "Please enter a valid email" },
          })}
        />
        {errors.email && <p role="alert">{errors.email.message}</p>}

        <input
          type="text"
          placeholder="Address"
          {...register("address", {
            minLength: {
              value: 2,
              message: "Please enter a descriptive address",
            },
          })}
        />
        {errors.address && <p role="alert">{errors.address.message}</p>}

        {!isValid && isDirty && (
          <button type="button" onClick={handleResetErrorFields}>
            Reset error fields only
          </button>
        )}
        <input type="submit" />
      </form>
    </>
  );
};
