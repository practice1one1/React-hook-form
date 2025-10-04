import React from 'react';
import { useForm } from 'react-hook-form';

export const ErrorsForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  function onValid(formData) {
    console.log(formData);
  }

  function oninvalid(error) {
    // triggers only when submitted. `error` has all the field names with their errors, as also accessed below eg errors["first-name"].message
    console.error('Form is invalid: ', error);
    // handle errors with appropraite UI updates to keep user informed
  }

  return (
    <form onSubmit={handleSubmit(onValid, oninvalid)}>
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
