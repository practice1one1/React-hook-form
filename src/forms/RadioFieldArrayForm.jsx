import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { customZodResolver } from "../utils/customZodResolver";

const fieldSchema = z.object({
  label: z.string(),
  selected: z.literal(
    ["lord radha krishna", "lord radha gopinath", "lord radha madana-mohana"],
    "Please select a deity"
  ),
});

const radioFieldArraySchema = z.object({
  fields: z.array(fieldSchema),
});

export const RadioFieldArrayForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fields: [{ label: "deities", selected: "" }],
    },
    resolver: customZodResolver(radioFieldArraySchema),
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
            <Controller // useFieldArray now only deals with this Controller's registered name. The Controller exposes a single string/option, instead of registering all radios with same name in useFieldArray
              name={`fields.${index}.selected`}
              control={control}
              render={({ field, formState }) => {
                // errors object from RHF is actual nested eg errorsIssuesObj.fields[0].selected[0] hence it's accessible via `fieldState.error` as set by RHF. While zod returns errorsIssuesObj["fields.0.selected.0"] where "fields.0.selected.0" is the string prop name holding {message. type, etc} so access it via entire `formState.errors` (holding all errors)
                const { value, ref, onChange, onBlur } = field;
                const handleRadioChange = (option) => onChange(option);

                return (
                  <>
                    <label>
                      Lord Radha Krishna
                      <input
                        type="radio"
                        name="deities" // not registering the `name` with RHF but defining it for the browser to allow any one active radio button
                        value={"lord radha krishna"}
                        onChange={(e) => handleRadioChange(e.target.value)}
                      />
                    </label>
                    <label>
                      Lord Radha Gopinath
                      <input
                        type="radio"
                        name="deities"
                        value={"lord radha gopinath"}
                        onChange={(e) => handleRadioChange(e.target.value)}
                      />
                    </label>
                    <label>
                      Lord Radha Madana-Mohana
                      <input
                        type="radio"
                        name="deities"
                        value={"lord radha madana-mohana"}
                        onChange={(e) => handleRadioChange(e.target.value)}
                      />
                    </label>

                    {Object.keys(formState.errors).length > 0 && (
                      <>
                        <p role="alert">
                          {
                            formState.errors[`fields.${index}.selected`] // where `fields.${index}.selected` is a prop at the "root" of errors object
                              ?.message
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
