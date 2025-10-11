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
          rules={{
            required: 'Date of birth is mandatory',
            validate(inputDate) {
              const today = new Date();
              return (
                today.getFullYear() - inputDate.getFullYear() >= 18 ||
                'You are too young to register'
              );
            },
          }}
          render={({ field: { onChange, ref, value, onBlur }, fieldState }) => {
            return (
              <>
                <ReactDatePicker
                  selected={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                />
                {fieldState.error && (
                  <p role='alert'>{fieldState.error.message}</p>
                )}
              </>
            );
          }}
        />
      </form>

      {dateOfBirth && <p>Selected date is: {dateOfBirth.toDateString()}</p>}
    </div>
  );
};
