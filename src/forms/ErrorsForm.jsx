import React from 'react';
import { useForm } from 'react-hook-form';

export const ErrorsForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onSubmitData(formData) {
    console.log(formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitData)}>
      <label>
        First Name:
        <input
          {...register('first-name', {
            required: { value: true, message: 'First name is required!' },
          })}
          aria-invalid={errors['first-name'] ? true : false}
        />
        {errors['first-name']?.type === 'required' && (
          <p role='alert'>{errors['first-name'].message}</p>
        )}
      </label>

      <input type='submit' value='Submit' />
    </form>
  );
};
