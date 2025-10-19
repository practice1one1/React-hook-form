import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

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
              rules={{
                required: "Please select any one deity",
                validate: (currentSelection, allFieldValues) => {
                  const validOptions = [
                    "lord radha krishna",
                    "lord radha gopinath",
                    "lord radha madana-mohana",
                  ];

                  return (
                    validOptions.includes(currentSelection) ||
                    "Invalid option selected"
                  );
                },
              }}
              render={({ field, fieldState }) => {
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

                    {fieldState.error && (
                      <p role="alert">{fieldState.error.message}</p>
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
