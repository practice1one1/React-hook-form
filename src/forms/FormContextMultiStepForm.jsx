import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

export const FormContextMultiStepForm = () => {
  const methods = useForm({
    defaultValues: {
      fieldGroup1: {
        field1: "default val1",
        field2: 10,
      },
      fieldGroup2: {
        field1: "default val2",
        field2: 5,
      },
    },
  });

  const [step, setStep] = useState(1);

  const handleStepping = async (direction) => {
    if (direction === "next") {
      const isValid = await methods.trigger("fieldGroup1");
      if (isValid) setStep(step + 1);
    }
    if (direction === "back") {
      // no validating step 2 fields if the user needs to go back to step 1 to avoid inconvenience
      setStep(step - 1);
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(
            (d) => console.log("Submitted", d),
            (err) => console.error("Submit error:", err)
          )}
        >
          {step === 1 && <StepOne />}
          {step === 2 && <StepTwo />}

          {step > 1 && (
            <button type="button" onClick={() => handleStepping("back")}>
              Back
            </button>
          )}
          {step > 1 ? (
            <input type="submit" />
          ) : (
            <button type="button" onClick={() => handleStepping("next")}>
              Skip to Next
            </button>
          )}
        </form>
      </FormProvider>
    </>
  );
};

const StepOne = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <fieldset>
        <legend>Field Group 1</legend>
        <label>
          Field 1
          <input
            type="text"
            {...register("fieldGroup1.field1", {
              required: "Please fill in the fields",
            })}
          />
        </label>
        <label>
          Field 2
          <input
            type="number"
            {...register("fieldGroup1.field2", {
              valueAsNumber: true,
              min: { value: 3, message: "Field 2 cannot be below 3" },
            })}
          />
        </label>

        {errors.fieldGroup1 && (
          <p role="alert">
            {errors.fieldGroup1.field1?.message || // showing both fields' errors
              errors.fieldGroup1.field2?.message}
          </p>
        )}
      </fieldset>
    </>
  );
};

const StepTwo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <fieldset>
        <legend>Field Group 2</legend>
        <label>
          Field 1
          <input
            type="text"
            {...register("fieldGroup2.field1", {
              required: "Please fill in the fields",
            })}
          />
        </label>
        <label>
          Field 2
          <input
            type="number"
            {...register("fieldGroup2.field2", { valueAsNumber: true })}
          />
        </label>

        {errors.fieldGroup2 && (
          <p role="alert">
            {errors.fieldGroup2.field1?.message || // showing both fields' errors
              errors.fieldGroup2.field2?.message}
          </p>
        )}
      </fieldset>
    </>
  );
};
