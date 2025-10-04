import React from 'react';
import { useForm } from 'react-hook-form';

export const WatchForm = () => {
  const { register, watch } = useForm();

  const allFields = watch();
  const isToSelectGender = watch('showGender', false); // initialize wiht false

  console.log('Specific set of inputs: ', watch(['showGender', 'gender']));

  return (
    <>
      <form>
        <input type='checkbox' {...register('showGender')} />
        <span>Show Gender selection</span>
        <br />
        <br />

        {isToSelectGender && (
          <select {...register('gender')}>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        )}
      </form>
      <br />
      <br />

      <span>Current data: </span>
      <pre>{JSON.stringify(allFields)}</pre>
    </>
  );
};
