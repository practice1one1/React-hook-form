import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

// console.log('Field values:', watch());
// console.log('%cTouched fields', 'color: lightblue', touchedFields);
// console.log('%cDirty fields', 'color: yellow', dirtyFields);
// console.log('%cError fields', 'color: red', errors);

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
              rules={{
                required: "Please select atleast one option",
                validate: (selectedOptions, allFieldValues) => {
                  const validOptions = [
                    "lord radha krishna",
                    "lord radha gopinath",
                    "lord radha madana-mohana",
                  ];
                  return (
                    selectedOptions.some((option) =>
                      validOptions.includes(option)
                    ) || "Invalid option selected"
                  );
                },
              }}
              render={({ field, fieldState }) => {
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
