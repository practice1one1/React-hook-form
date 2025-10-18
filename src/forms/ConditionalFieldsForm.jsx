import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

export const ConditionalFieldsForm = () => {
  const { register, control, handleSubmit, unregister } = useForm({
    defaultValues: {
      fields: [
        { label: "field1", value: "val1" }, // each object represents a single field. If to have mulitple fields in a group (implementing field groups), then make an array of subarrays: fields: [ [{}, {}], [{}, {}, {}], {} ]
        { label: "field2", value: "val2" },
        { label: "field3", value: "val3" },
      ],
    },
    shouldUnregister: true, // removes all props (eg label) & objects from the FieldValues (see in defaultValues above) that are not registered with /tied to <input> below
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

  // No need of this effect as hook form's shouldUnregister flag does this internally
  // useEffect(() => {
  //   visibleFields.forEach((visible, index) => {
  //     if (!visible) unregister(`fields.${index}`);
  //   });
  // }, [visibleFields]);

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
