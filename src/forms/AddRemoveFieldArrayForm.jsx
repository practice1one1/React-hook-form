import React from "react";
import { useFieldArray, useForm } from "react-hook-form";

export const AddRemoveFieldArrayForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      personalDetailsFields: [
        { label: "Name", value: "" },
        { label: "Country", value: "" },
        { label: "Region", value: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "personalDetailsFields",
  });

  const hasAddedExtraFields = fields.some(
    (f) => f.label === "District" || f.label === "Town"
  ); //no need to store extra unnecessary state var informing if a user has added extra fields, if it is attainable from avalable data
  console.log(hasAddedExtraFields);
  return (
    <>
      <form
        onSubmit={handleSubmit(
          (d) => console.log("Submitted", d),
          (err) => console.error("Submit error:", err)
        )}
      >
        <fieldset>
          <legend>Personal Details</legend>
          {fields.map((field, index) => (
            <label key={field.id}>
              {field.label}
              <input {...register(`personalDetailsFields.${index}.value`)} />
            </label>
          ))}

          {!hasAddedExtraFields ? (
            <button
              type="button"
              onClick={() =>
                append(
                  [
                    { label: "District", value: "" },
                    { label: "Town", value: "" },
                  ],
                  {
                    focusIndex: 3, // focuses on "District" after appending these. as "District" is the 4th field in the fields-array
                  }
                )
              }
            >
              Add Specific Addresses
            </button>
          ) : (
            <button type="button" onClick={() => remove([3, 4])}>
              Remove Specific Addresses
            </button>
          )}
        </fieldset>

        <input type="submit" />
      </form>
    </>
  );
};
