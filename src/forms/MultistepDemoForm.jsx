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
    comment: z.string().nonempty("Please provide a quick review"), // made review comment compulsory to show difference between errors during validation at intermediate steps and validation at submit
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
  const {
    handleSubmit,
    trigger,
    formState: { errors },
  } = formMethods;
  console.log("err obj", errors); // see all error objects during all validations

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

const PersonalInfoStep = ({ register, formState: { errors } }) => {
  return (
    <fieldset>
      <legend>Personal Information</legend>

      <label>
        Name
        <input type="text" {...register("personalInfo.name")} />
      </label>
      {errors.personalInfo?.name && ( // error objects exposed during "validation in intermediate steps" (before submit validation) are nestd objects
        <p role="alert">{errors.personalInfo?.name.message}</p>
      )}

      <label>
        DOB
        <input type="date" {...register("personalInfo.DOB")} />
      </label>
      {errors.personalInfo?.DOB && (
        <p role="alert">{errors.personalInfo?.DOB.message}</p>
      )}
    </fieldset>
  );
};

const ContactInfoStep = ({ register, formState: { errors } }) => {
  return (
    <fieldset>
      <legend>Personal Information</legend>

      <label>
        Email
        <input type="email" {...register("contactInfo.email")} />
      </label>
      {errors.contactInfo?.email && (
        <p role="alert">{errors.contactInfo?.email.message}</p>
      )}
      <label>
        Telephone
        <input
          type="tel"
          {...register("contactInfo.telephone")}
          placeholder="Please include country code"
        />
      </label>
      {errors.contactInfo?.telephone && (
        <p role="alert">{errors.contactInfo?.telephone.message}</p>
      )}
    </fieldset>
  );
};

const ReviewSubmitStep = ({ register, formState: { errors } }) => {
  return (
    <fieldset>
      <legend>Personal Information</legend>

      <label>
        Name
        <textarea {...register("reviewInfo.comment")} />
      </label>
      {errors["reviewInfo.comment"] && ( // error objects exposed during "validation on submit" are shallow objects ie one level deep, with prop names as strings containing the path (made by customZodResolver)
        <p role="alert">{errors["reviewInfo.comment"].message}</p>
      )}
    </fieldset>
  );
};
