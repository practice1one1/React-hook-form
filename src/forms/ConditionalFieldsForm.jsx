import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { customZodResolver } from "../utils/customZodResolver";

const fieldSchema = z
  .object({
    label: z.string().optional(), // may or may not be submitted if "label" is not registered / tied up to any <input>
    value: z.string().trim().nonempty("This field is required when not hidden"), //required
  })
  .optional(); // when you don't register a field with an <input>, `shouldUnregister`removes that prop from the field object, or replaces the whole object with `null` in the field array internally (of useFieldArray). During submit, `null` in the field array is parsed as undefined, which is what zod receives to validate

const conditionalFieldsFormSchema = z.object({
  fields: z.array(fieldSchema).superRefine((fields, ctx) => {
    // checking non-empty strings again (just to play with superRefine() 😉)
    fields.forEach((field) => {
      if (
        field && // whole field may be undefined. See comment on .optional() above
        (!field.value || field.value.trim() === "") // user may just put space and submit form and field.value will become truthy!
      ) {
        ctx.addIssue({
          code: "invalid_value",
          message: "This field is required when not hidden",
          // path: ["fields", "(field at some index)", "value"]
        });
      }
    });
  }),
});

export const ConditionalFieldsForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid, submitCount },
  } = useForm({
    defaultValues: {
      fields: [
        { label: "field1", value: "val1" }, // each object represents a single field. If to have mulitple fields in a group (implementing field groups), then make an array of subarrays: fields: [ [{}, {}], [{}, {}, {}], {} ]
        { label: "field2", value: "val2" },
        { label: "field3", value: "val3" },
      ],
    },
    shouldUnregister: true, // removes all props (eg label) & objects from the FieldValues (see in defaultValues above) that are not registered with /tied to <input> below
    resolver: customZodResolver(conditionalFieldsFormSchema),
  });

  const { fields } = useFieldArray({
    control,
    name: "fields",
  });

  const [visibleFields, setVisibleFields] = useState([false, true, false]);
  const toggleVisibility = (index) => {
    setVisibleFields((visibilityStates) =>
      visibilityStates.map((s, i) => (i === index ? !s : s))
    );
  };

  return (
    <form
      onSubmit={handleSubmit(
        (d) => console.log(d),
        (err) => console.error("Submit err", err)
      )}
    >
      {fields.map((field, index) => (
        <Field
          key={field.id}
          index={index}
          isVisible={visibleFields[index]}
          label={field.label}
          errors={errors}
          value={field.value}
          register={register}
          toggleVisibility={toggleVisibility}
        />
      ))}

      {!isValid && submitCount > 1 ? (
        <input disabled value={"Enter valid info to Re-submit"} />
      ) : (
        <input type="submit" />
      )}
    </form>
  );
};

const Field = ({
  isVisible,
  label,
  value,
  errors,
  register,
  toggleVisibility,
  index,
}) => {
  return isVisible ? (
    <div>
      <label>
        <button type="button" onClick={() => toggleVisibility(index)}>
          Hide {label}
        </button>
        <span>{label}</span>
        <input {...register(`fields[${index}].value`)} />
      </label>
      {errors[`fields.${index}.value`] && ( // "fields.0.value" is the name of the field/prop itself, as set when registering the field
        <p role="alert">{errors[`fields.${index}.value`].message}</p>
      )}
    </div>
  ) : (
    <div>
      <button type="button" onClick={() => toggleVisibility(index)}>
        Show {label}
      </button>
      <span style={{ opacity: 0.5 }}>{label} (hidden)</span>
    </div>
  );
};
