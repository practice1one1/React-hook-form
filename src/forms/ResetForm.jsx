import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const ResetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    watch,
    reset,
  } = useForm();

  // console.log('Field vals:', watch());
  console.log('Touched fields:', touchedFields);
  console.log('Dirty fields:', dirtyFields);

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
          onClick={() => reset()} // resets the field values to {}
          // onClick={() => reset({field1: "new default field1"})} // resets the field values state to only contain a "new" "field1" field alone
          // onClick={() => // this practically does "no usefull reset" as it keeps almost everything
          //   reset((fieldVals) => ({ ...fieldVals }), {
          //     keepTouched: true,
          //     keepDirty: true,
          //   })
          // }
          //
        >
          Reset...
        </button>

        <input type='submit' />
      </form>
    </>
  );
};
