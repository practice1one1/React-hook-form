import React from "react";
import { useForm } from "react-hook-form";
import "../style/basicForm.css";

const BasicForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  // console.log(watch("name")) //logs value of 'name' on each render / input-change-event

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Your info</legend>
        <label>
          Name:
          <input
            {...register("name", {
              required: { value: true, message: "This field is required" },
            })}
          />
        </label>
        {errors.name && <p>{errors.name.message}</p>}
        <label>
          Age:
          <input
            type="number"
            {...register("age", {
              valueAsNumber: true,
              min: { value: 1, message: "Age can't be less than 1 year" },
              max: { value: 100, message: "Age above 100 years is overlooked" },
            })}
          />
        </label>
        {errors.age && <p>{errors.age.message}</p>}
      </fieldset>

      <fieldset>
        <legend>Contact</legend>
        <label>
          Email:
          <input
            type="email"
            {...register("email", {
              required: { value: true, message: "Please provide an email!" },
              pattern: {
                value: /dsorg/,
                message: "Please provide your LAN/locally used email",
              },
            })}
          />
        </label>
        {errors.email && <p>{errors.email.message}</p>}
      </fieldset>

      <input type="submit" value="Submit" />
    </form>
  );
};

export default BasicForm;
