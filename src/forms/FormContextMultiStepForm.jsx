import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import z, { refine } from "zod";
import { customZodResolver } from "../utils/customZodResolver";

const schema = z.object({
  fieldGroup1: z.object({
    field1: z.string().trim().nonempty("Please fill in the fields"),
    field2: z.number().min(3, "Field 2 cannot be below 3"),
  }),
  fieldGroup2: z.object({
    field1: z.string().nonempty("Please fill in the fields"),
    field2: z.number(),
  }),
});

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
    shouldUnregister: false,
    resolver: customZodResolver(schema),
  });

  const [step, setStep] = useState(1);

  const handleStepping = async (direction) => {
    if (direction === "next") {
      const isValid = await methods.trigger([
        // when using zod validation with trigger() (and always), pass the exact field names eg this array instead of specifying the group name eg "fieldGroup1" as this fails to work
        "fieldGroup1.field1",
        "fieldGroup1.field2",
      ]);
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
            (d) => console.log("Submitted", d)
            // (err) => console.error("Submit error:", err)
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
          <input type="text" {...register("fieldGroup1.field1")} />
        </label>
        <label>
          Field 2
          <input
            type="number"
            {...register("fieldGroup1.field2", {
              valueAsNumber: true,
            })}
          />
        </label>

        {Object.keys(errors).length > 0 && (
          <p role="alert">
            {errors.fieldGroup1?.field1?.message || // showing both fields' errors
              errors.fieldGroup1?.field2?.message}
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
          <input type="text" {...register("fieldGroup2.field1")} />
        </label>
        <label>
          Field 2
          <input
            type="number"
            {...register("fieldGroup2.field2", { valueAsNumber: true })}
          />
        </label>

        {Object.keys(errors).length > 0 && (
          <p role="alert">
            {errors["fieldGroup2.field1"]?.message || // for some reason, the errors in step one are provided as nested objects errors.fieldGroup1.field1, while errors in step two (before submit) are provided in a single prop name errors["fieldGroup2.field1"]
              errors["fieldGroup2.field2"]?.message}
          </p>
        )}
      </fieldset>
    </>
  );
};
