import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

export const ControllerDatePickerForm = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      dateOfBirth: new Date(),
    },
  });

  const dateOfBirth = watch('dateOfBirth');

  const onSubmit = (data) => console.log(data);
  const onError = (err) => console.error('Submit err:', err);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Controller
          name='dateOfBirth'
          control={control}
          render={({ field: { onChange, ref, value, onBlur } }) => {
            return (
              <ReactDatePicker
                selected={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
              />
            );
          }}
        />
      </form>

      {dateOfBirth && <p>Selected date is: {dateOfBirth.toDateString()}</p>}
    </div>
  );
};
