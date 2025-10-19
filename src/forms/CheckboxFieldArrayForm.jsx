import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { customZodResolver } from "../utils/customZodResolver";

const fieldSchema = z.object({
  label: z.string(),
  selected: z
    .array(
      z.literal(
        [
          "lord radha krishna",
          "lord radha gopinath",
          "lord radha madana-mohana",
        ],
        {
          error: "Invalid option selected",
        }
      )
    )
    .min(1, "Please select atleast one option"),
});

const checkboxFieldArraySchema = z.object({
  fields: z.array(fieldSchema),
});

export const CheckboxFieldArrayForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fields: [{ label: "deities", selected: [] }],
    },
    resolver: customZodResolver(checkboxFieldArraySchema),
  });

  const { fields } = useFieldArray({
    control,
    name: "fields",
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (d) => console.log("Submitted", d),
          (err) => console.error("Submit error:", err)
        )}
      >
        {fields.map((field, index) => (
          <div key={field.id}>
            <Controller // useFieldArray now only deals with this Controller's registered name. The Controller exposes a single array of selected options, instead of registering all checkboxes with smae name in useFieldArray
              name={`fields.${index}.selected`}
              control={control}
              render={({ field, formState }) => {
                // errors object from RHF is actual nested eg errorsIssuesObj.fields[0].selected[0] hence it's accessible via `fieldState.error` as set by RHF. While zod returns errorsIssuesObj["fields.0.selected.0"] where "fields.0.selected.0" is the string prop name holding {message. type, etc} so access it via entire `formState.errors` (holding all errors)
                const { value: selectedOptions, ref, onChange, onBlur } = field;
                const handleCheckboxChange = (option) => {
                  if (selectedOptions.includes(option)) {
                    onChange(selectedOptions.filter((o) => o !== option));
                  } else {
                    onChange([...selectedOptions, option]); // the order of the options in the array depicts the actual order of selection by user
                  }
                };

                return (
                  <>
                    <label>
                      Lord Radha Krishna
                      <input
                        type="checkbox"
                        value={"lord radha krishna"}
                        onChange={(e) => handleCheckboxChange(e.target.value)}
                      />
                    </label>
                    <label>
                      Lord Radha Gopinath
                      <input
                        type="checkbox"
                        value={"lord radha gopinath"}
                        onChange={(e) => handleCheckboxChange(e.target.value)}
                      />
                    </label>
                    <label>
                      Lord Radha Madana-Mohana
                      <input
                        type="checkbox"
                        value={"lord radha madana-mohana"}
                        onChange={(e) => handleCheckboxChange(e.target.value)}
                      />
                    </label>

                    {Object.keys(formState.errors).length > 0 && (
                      <>
                        <p role="alert">
                          {
                            // error in entire `selected` field (when no option selected)
                            formState.errors[`fields.${index}.selected`]
                              ?.message
                          }
                        </p>
                        <p role="alert">
                          {
                            // error in a particular selected optio (when invalid option value passed)
                            formState.errors[`fields.${index}.selected.0`]
                              ?.message // even though error is on the 2nd or 3rd checkbox, the path remains same "....selected.0"
                          }
                        </p>
                      </>
                    )}
                  </>
                );
              }}
            />
          </div>
        ))}

        <input type="submit" />
      </form>
    </>
  );
};
