import React from "react";
import { get, useForm } from "react-hook-form";

export const SetValueAsForm = () => {
  const { register, handleSubmit, watch, getValues } = useForm();

  const prefixedName = watch("name");

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log("Submitted", d))}>
        <select {...register("gender")}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br />
        <br />

        <input
          type="text"
          placeholder="Enter Your name (Prefix eg Mr. OR Mrs. will automatically be entered according to gender"
          {...register("name", {
            setValueAs: function (name) {
              const gender = getValues("gender");
              if (gender === "male") {
                return `Mr. ${name}`;
              } else if (gender === "female") {
                return `Mrs. ${name}`;
              }
            },
          })}
          style={{ width: "800px" }}
        />
        <br />
        <br />

        <input type="submit" />
      </form>
      <br />
      <br />

      <p>
        <em>Name to submit:</em> {prefixedName}
      </p>
    </>
  );
};
