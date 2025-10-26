import React from "react";
import { useController, useForm } from "react-hook-form";

export const UseControllerForm = () => {
  const { handleSubmit, control } = useForm();

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (d) => console.log("Submitted", d),
          (err) => console.error("Submit error:", err)
        )}
      >
        <Input type={"text"} control={control} />
        <Checkboxes control={control} options={["a", "b", "c"]} />

        <input type="submit" />
      </form>
    </>
  );
};

const Input = ({ type, control }) => {
  const { field, fieldState, formState } = useController({
    name: "aa",
    control,
    rules: { required: "This field is required" },
    defaultValue: "aa default",
  });

  console.log(field.value);

  return <input type={type} {...field} />;
};

const Checkboxes = ({ control, options }) => {
  const { field } = useController({
    name: "checkboxes",
    control,
    rules: { required: true },
    defaultValue: ["b"],
  });

  const handleCheckboxChange = (e) => {
    const checkboxValue = e.target.value;
    const currentFieldValue = field.value || [];

    let newFieldValue = [];
    if (currentFieldValue?.includes(checkboxValue)) {
      newFieldValue = currentFieldValue.filter(
        (item) => item !== checkboxValue
      );
    } else {
      newFieldValue = [...currentFieldValue, checkboxValue];
    }

    field.onChange(newFieldValue);
  };

  return (
    <div>
      {options.map((option, index) => (
        <>
          <label>{option}</label>
          <input
            key={option}
            type="checkbox"
            value={option}
            name={field.name}
            onBlur={field.onBlur}
            onChange={handleCheckboxChange}
            ref={field.ref}
            checked={field.value?.includes(option)}
          />
        </>
      ))}
    </div>
  );
};
