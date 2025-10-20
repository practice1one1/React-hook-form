import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

export const MultistepDemoForm = () => {
  const formMethods = useForm({
    defaultValues: {
      personalInfo: {
        name: "",
        DOB: 0,
      },
      contactInfo: {
        email: "",
        telephone: 0,
      },
      reviewInfo: {
        comment: "",
      },
    },
  });
  const { handleSubmit } = formMethods;

  const [step, setStep] = useState(1);

  const handleStepChange = useCallback((direction) => {
    if (direction === "next" && step < 3) {
      setStep(step + 1);
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
        <input type="tel" {...register("contactInfo.telephone")} />
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
