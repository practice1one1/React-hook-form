import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { customZodResolver } from "../utils/customZodResolver";

const fieldSchema = z.object({
  label: z.string(),
  value: z.string(),
  isVisible: z.boolean(),
});

const conditionalFieldsFormSchema = z.object({
  fields: z.array(fieldSchema).superRefine((fields, ctx) => {
    fields.forEach((field, index) => {
      if (
        field.isVisible &&
        (!field.value || field.value.trim() === "") // user may just put space and submit form and field.value will become truthy!
      ) {
        ctx.addIssue({
          code: "invalid_value",
          message: "This field is required when not hidden",
          path: [`${index}`, "value"], // inform about path AFTER fields. ... because .superRefine() runs on values inside `fields`
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
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      fields: [
        { label: "field1", value: "val1", isVisible: false }, // each object represents a single field. If to have mulitple fields in a group (implementing field groups), then make an array of subarrays: fields: [ [{}, {}], [{}, {}, {}], {} ]
        { label: "field2", value: "val2", isVisible: true },
        { label: "field3", value: "val3", isVisible: false },
      ],
    },
    resolver: customZodResolver(conditionalFieldsFormSchema),
  });

  const { fields } = useFieldArray({
    control,
    name: "fields",
  });

  const fieldObjects = watch("fields");

  const toggleVisibility = (index) => {
    const currentVisibility = fieldObjects[index]?.isVisible;
    setValue(`fields.${index}.isVisible`, !currentVisibility, {
      shouldDirty: true,
    });
  };

  const onSubmit = (fieldValues) => {
    const visibleFields = fieldValues.fields.filter((f) => f.isVisible);
    const fieldsToSubmit = visibleFields.map((f) => ({
      label: f.label,
      value: f.value,
    })); // only include required fields to submit to server, ignore others eg isVisible

    console.log("Submitted to server:", fieldsToSubmit);
  };

  const onError = (err) => console.error("Submit err", err);

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit, // you may manually remove `isVisible` and `label` before sending field values (form data) to server
        onError
      )}
    >
      {fields.map((field, index) => (
        <Field
          key={field.id}
          index={index}
          isVisible={fieldObjects[index].isVisible} // `fieldObjects` is a watched state of fields, subscribing to any changes. `fields` is a snapshot that only updates if you `remove()`, `append()` etc from field-array
          label={field.label}
          errors={errors}
          value={field.value}
          register={register}
          toggleVisibility={() => toggleVisibility(index)}
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
        <button type="button" onClick={toggleVisibility}>
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
      <button type="button" onClick={toggleVisibility}>
        Show {label}
      </button>
      <span style={{ opacity: 0.5 }}>{label} (hidden)</span>
    </div>
  );
};
