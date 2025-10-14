import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

export const FieldArrayForm = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      fieldGroups: [
        // or name it as inputGroups, as it represents an array of objects where each object represents one field group (field1 & field2) appended on one click of Append button
        {
          field1: "val-1",
          field2: "",
        },
      ],
    },
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "fieldGroups",
  });

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <ul>
          {fields.map((field, index) => (
            <li key={field.id}>
              <input type="text" {...register(`fieldGroups.${index}.field1`)} />

              {/* Or connect externally controlled component using Controller: */}
              <Controller
                name={`fieldGroups.${index}.field2`}
                control={control}
                render={({ field }) => <input {...field} />}
              />
              <button type="button" onClick={() => remove(index)}>
                Delete field
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          // onClick={() => append({ field1: "val1", field2: "val2" })} // rather describe fields with defaults in `defaultValues` option
          // onClick={append} // ⚠️ same as: onClick((e: SyntheticBaseEvent) => append(e))
          onClick={() => append()}
          // onClick={() => append({ field3: "val-3" })} // it will appear in the submitted data, but no input for it will be rendered on screen on clicking the button because no <input> has a registered name of `field3` in <li> above
        >
          Append
        </button>

        <input type="submit" />
      </form>
    </>
  );
};
