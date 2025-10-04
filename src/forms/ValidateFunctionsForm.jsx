import React from 'react';
import { useForm } from 'react-hook-form';

const ValidateFunctionsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log('Submitted', d))}>
        <select {...register('gender')}>
          <option value='male'>Male</option>
          <option value='female'>Female</option>
        </select>
        <br />
        <br />

        <input
          type='text'
          placeholder='Enter Your name but include name prefix eg Mr. OR Mrs. and hit ENTER'
          {...register('prefix-name', {
            validate: {
              // runs all funcs in this obj INITIALLY UPON SUBMIT then on every render if form is modified
              validationFunc: function (currentInput, allFormValues) {
                console.log('currentInput: ', currentInput);
                console.log('allFormValues: ', allFormValues);

                return true;
              },
              isCorrectPrefix: function (name, allFormValues) {
                if (allFormValues.gender === 'male') {
                  return name.includes('Mr');
                }

                if (allFormValues.gender === 'female') {
                  return name.includes('Mrs');
                }
                return false;
              },
            },
          })}
          style={{ width: '700px' }}
        />
      </form>
      {errors['prefix-name']?.type === 'isCorrectPrefix' && (
        <p role='alert'>Please enter a correct prefix</p>
      )}
    </>
  );
};

export default ValidateFunctionsForm;
