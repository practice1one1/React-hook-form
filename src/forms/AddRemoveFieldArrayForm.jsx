import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";
import { customZodResolver } from "../utils/customZodResolver";

const fieldSchema = z
  .object({
    label: z.literal(
      ["Name", "Country", "Region", "District", "Town"],
      "Invalid field submitted"
    ),
    value: z.string(),
  })
  .refine(
    (field) => {
      // district and town is optional but the rest are compulsory
      const compulsory = ["Name", "Country", "Region"];
      if (compulsory.includes(field.label)) {
        return field.value.trim() !== "";
      } else {
        return true;
      }
    },
    {
      error: "Please fill in the compulsory fields",
    }
  );

const addRemoveFieldArraySchema = z.object({
  personalDetailsFields: z
    .array(fieldSchema)
    .min(3, "Please submit Names, Country and Region"),
});

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
    resolver: customZodResolver(addRemoveFieldArraySchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "personalDetailsFields",
  });

  const hasAddedExtraFields = fields.some(
    (f) => f.label === "District" || f.label === "Town"
  ); //no need to store extra unnecessary state var informing if a user has added extra fields, if it is attainable from avalable data

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
            <div key={field.id}>
              <label>
                {field.label}
                <input {...register(`personalDetailsFields.${index}.value`)} />
              </label>
              {errors[`personalDetailsFields.${index}`] && (
                <p role="alert">
                  {errors[`personalDetailsFields.${index}`].message}
                </p>
              )}
            </div>
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
