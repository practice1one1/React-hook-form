import React from 'react';
import { useForm } from 'react-hook-form';
import '../style/MultipleCheckboxForm.css';

export const MultipleCheckboxForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log('Submitted', d))}>
        <input
          type='checkbox'
          value={'apples'}
          id='apples'
          {...register('fruits-to-buy')}
        />
        <label htmlFor='apples'>Apples</label>
        <br />

        <input
          type='checkbox'
          value={'bananas'}
          id='bananas'
          {...register('fruits-to-buy')}
        />
        <label htmlFor='bananas'>Bananas</label>
        <br />

        <input
          type='checkbox'
          value={'mangoes'}
          id='mangoes'
          {...register('fruits-to-buy')}
        />
        <label htmlFor='mangoes'>Mangoes</label>
        <br />

        {/* all selected/checked checkboxes' values are submitted in array named 'fruits-to-buy' */}

        <input type='submit' />
      </form>
    </>
  );
};
