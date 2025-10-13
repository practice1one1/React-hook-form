import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { customZodResolver } from "../utils/customZodResolver";
import "react-datepicker/dist/react-datepicker.css";

const schema = z.object({
  dateOfBirth: z.date({ error: "Please enter a valid date" }).refine(
    (inputDate) => {
      const today = new Date();
      return today.getFullYear() - inputDate.getFullYear() >= 18;
    },
    {
      error: "You are too young to register",
    },
  ),
});

export const ControllerDatePickerForm = () => {
  const { control, handleSubmit, watch } = useForm({
    resolver: customZodResolver(schema),
    defaultValues: {
      dateOfBirth: new Date(),
    },
  });

  const dateOfBirth = watch("dateOfBirth");

  const onSubmit = (data) => console.log(data);
  const onError = (err) => console.error("Submit err:", err);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Controller
          name="dateOfBirth"
          control={control}
          render={({ field: { onChange, ref, value, onBlur }, fieldState }) => {
            return (
              <div>
                <ReactDatePicker
                  selected={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  // ref={ref} // this is a ref to the wrapper around the input inside ReactDatePicker
                  customInputRef={ref} // this a ref to the actual date input within. ⚠️This is silently throwing a DOM error about some prop/method/attribute being passed to the native <input> by hook form, that it doesn't recognize
                />
                {fieldState.error && (
                  <p role="alert">{fieldState.error.message}</p>
                )}
              </div>
            );
          }}
        />

        <input type="submit" />
      </form>

      {dateOfBirth && <p>Selected date is: {dateOfBirth.toDateString()}</p>}
    </div>
  );
};
