import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { customZodResolver } from "../utils/customZodResolver";

const schema = z.object({
  personalInfo: z.object({
    name: z.string().nonempty("Please fill in your name"),
    DOB: z.coerce.date("Please enter your date of birth"),
  }),
  contactInfo: z.object({
    email: z.email("Please provide your email"),
    telephone: z
      .string()
      .trim()
      .regex(
        /^\+?[0-9\s\-()]{5,20}$/, // smallest number with min 4 phone number digits + 1 country code digit. Largest number with 17 phone number digits + 3 country code digits
        "Please enter a valid telephone number including country code"
      ),
  }),
  reviewInfo: z.object({
    comment: z.string().optional(),
  }),
});

export const MultistepDemoForm = () => {
  const formMethods = useForm({
    defaultValues: {
      personalInfo: {
        name: "",
        DOB: "",
      },
      contactInfo: {
        email: "",
        telephone: "",
      },
      reviewInfo: {
        comment: "",
      },
    },
    resolver: customZodResolver(schema),
  });
  const { handleSubmit, trigger } = formMethods;

  const [step, setStep] = useState(1);

  const handleStepChange = useCallback(async (direction) => {
    if (direction === "next" && step < 3) {
      const fieldsToValidate =
        step === 1
          ? ["personalInfo.name", "personalInfo.DOB"]
          : step === 2
          ? ["contactInfo.email", "contactInfo.telephone"]
          : null;

      const isValid = await trigger(fieldsToValidate, { shouldFocus: true });
      if (isValid) {
        console.log(fieldsToValidate);
        setStep(step + 1);
      }
    } else if (direction === "back" && step > 1) {
      setStep(step - 1);
    }
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (d) => console.log("Submitted", d),
          (err) => console.error("Submit error:", err)
        )}
      >
        {step === 1 && <PersonalInfoStep {...formMethods} />}
        {step === 2 && <ContactInfoStep {...formMethods} />}
        {step === 3 && <ReviewSubmitStep {...formMethods} />}

        {step > 1 && (
          <button type="button" onClick={() => handleStepChange("back")}>
            Back
          </button>
        )}
        {step < 3 ? (
          <button type="button" onClick={() => handleStepChange("next")}>
            Next
          </button>
        ) : (
          <input type="submit" />
        )}
      </form>
    </>
  );
};

const PersonalInfoStep = ({ register }) => {
  return (
    <fieldset>
      <legend>Personal Information</legend>

      <label>
        Name
        <input type="text" {...register("personalInfo.name")} />
      </label>
      <label>
        DOB
        <input type="date" {...register("personalInfo.DOB")} />
      </label>
    </fieldset>
  );
};

const ContactInfoStep = ({ register }) => {
  return (
    <fieldset>
      <legend>Personal Information</legend>

      <label>
        Email
        <input type="email" {...register("contactInfo.email")} />
      </label>
      <label>
        Telephone
        <input
          type="tel"
          {...register("contactInfo.telephone")}
          placeholder="Please include country code"
        />
      </label>
    </fieldset>
  );
};

const ReviewSubmitStep = ({ register }) => {
  return (
    <fieldset>
      <legend>Personal Information</legend>

      <label>
        Name
        <textarea {...register("reviewInfo.comment")} />
      </label>
    </fieldset>
  );
};
