import React, { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

export const ResetForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
    watch,
    resetField,
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      field1: 'default val field1',
      field2: 'default val field2',
      field3: 'default val field3',
    },
  });

  // console.log('Field values:', watch());
  console.log('%cTouched fields', 'color: lightblue', touchedFields);
  // console.log('%cDirty fields', 'color: yellow', dirtyFields);
  // console.log('%cError fields', 'color: red', errors);

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (d) => console.log('Submitted', d),
          (err) => console.error('Submit error:', err)
        )}
      >
        <input
          type='text'
          {...register('field1', {
            minLength: {
              value: 2,
              message: 'Please enter at least 2 characters',
            },
          })}
        />
        <button type='button' onClick={() => resetField('field1')}>
          Reset both touched/dirty state & field values (user input) state of
          Field 1
        </button>

        <input
          type='text'
          {...register('field2', {
            minLength: {
              value: 2,
              message: 'Please enter at least 2 characters',
            },
          })}
        />
        <button
          type='button'
          onClick={() => {
            resetField('field2', {
              // keepDirty: true,
              // keepError: true,
              keepTouched: true,
            });
          }}
        >
          Reset field values (user input) state but retain touched/dirty state
          in Field 2
        </button>

        <input
          type='text'
          {...register('field3', {
            minLength: {
              value: 2,
              message: 'Please enter at least 2 characters',
            },
          })}
        />
        <button
          type='button'
          onClick={() => {
            const currentField2Value = getValues('field3');
            resetField('field3'); // resets all, including touched state & field values
            setValue('field3', currentField2Value); // applies back the field values
          }}
        >
          Reset touched/dirty state but retain field values (user input) in
          Field 3
        </button>

        <input type='submit' />
      </form>
    </>
  );
};
