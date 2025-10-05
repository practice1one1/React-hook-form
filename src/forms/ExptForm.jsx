import React from 'react';
import { useForm } from 'react-hook-form';

export const ExptForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log('Submitted', d))}>
        <input type='text' {...register('names.0.firstname')} />
        <input type='text' {...register('names.0.lasttname')} />
        <input type='text' {...register('names.1.firstname')} />

        <input type='submit' />
      </form>
    </>
  );
};
