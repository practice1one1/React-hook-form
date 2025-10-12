import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { getResetDataFromAPI } from '../../mocks/getResetDataFromAPI';

export const ResetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    watch,
    reset,
  } = useForm();

  const resetFormAsync = useCallback(async () => {
    const valuesToResetWith = await getResetDataFromAPI();
    reset(valuesToResetWith);
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (d) => console.log('Submitted', d),
          (err) => console.error('Submit error:', err)
        )}
      >
        <input type='text' {...register('field1')} />
        <input type='text' {...register('field2')} />

        <button
          type='button'
          onClick={() =>
            // can also call resetFormAsync() insided a useEffect(). Make sure the useEffect()s inside useForm() finish running before you reset the form. Here, the user is guaranteed to click this button (to reset the form) after useEffect()s have been called (happens quickly on render)
            resetFormAsync()
          }
        >
          Reset...
        </button>

        <input type='submit' />
      </form>
    </>
  );
};
