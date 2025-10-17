import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export const ConditionalFieldsForm = () => {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      fields: [
        { label: "field1", value: "val1" }, // each object represents a single field. If to have mulitple fields in a group (implementing field groups), then make an array of subarrays: fields: [ [{}, {}], [{}, {}, {}], {} ]
        { label: "field2", value: "val2" },
        { label: "field3", value: "val3" },
      ],
    },
    shouldUnregister: true,
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

  // console.log(visibleFields);

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
          value={field.value}
          register={register}
          toggleVisibility={toggleVisibility}
        />
      ))}

      <input type="submit" />
    </form>
  );
};

const Field = ({
  isVisible,
  label,
  value,
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
