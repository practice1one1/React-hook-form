import React from "react";
import { useForm } from "react-hook-form";

export const SetValueForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    setValue,
    watch,
  } = useForm();

  const [firstname, lastname] = watch(["name.firstname", "name.lastname"]);

  // console.count('rendered');

  return (
    <>
      {/* <pre>{JSON.stringify(touchedFields, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(dirtyFields, null, 2)}</pre> */}
      <form
        onSubmit={handleSubmit(
          (d) => console.log("Submitted", d),
          (err) => console.error("Submit error:", err),
        )}
      >
        <input
          type="text"
          {...register("name.firstname", {
            minLength: {
              value: 2,
              message: "Please inlcude at least 2 characters",
            },
          })}
        />
        <input
          type="text"
          {...register("name.lastname", {
            minLength: {
              value: 2,
              message: "Please inlcude at least 2 characters",
            },
          })}
        />
        <input
          type="text"
          {...register("name.fullname", {
            validate: (fullnameInput, allInputs) =>
              (fullnameInput.includes(allInputs.name.firstname) &&
                fullnameInput.includes(allInputs.name.lastname)) ||
              "Fullname does not match first and last names",
          })}
        />

        <button
          type="button"
          onClick={() =>
            setValue("name.fullname", `${firstname} ${lastname}`, {
              // all parameters default: false
              shouldValidate: true,
              shouldTouch: true,
              shouldDirty: true,
            })
          }
        >
          Guess Fullname
        </button>

        <input type="submit" />
      </form>
    </>
  );
};
