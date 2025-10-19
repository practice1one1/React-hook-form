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
            <button type="button" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          {step > 1 ? (
            <input type="submit" />
          ) : (
            <button type="button" onClick={() => setStep(step + 1)}>
              Skip to Next
            </button>
          )}
        </form>
      </FormProvider>
    </>
  );
};

const StepOne = () => {
  const { register } = useFormContext();

  return (
    <>
      <fieldset>
        <legend>Field Group 1</legend>
        <label>
          Field 1
          <input
            type="text"
            {...register("fieldGroup1.field1", {
              required: "Please fill in this field",
            })}
          />
        </label>
        <label>
          Field 2
          <input
            type="number"
            {...register("fieldGroup1.field2", { valueAsNumber: true })}
          />
        </label>
      </fieldset>
    </>
  );
};

const StepTwo = () => {
  const { register } = useFormContext();

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
      </fieldset>
    </>
  );
};
