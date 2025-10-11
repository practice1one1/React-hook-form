// When connecting Zod (or, specifically, zodResolver() or customResolver), the default behaviour of initial validation on first submit attempt then validation on every input doesn't work well. Used a work around below for it to work

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { customZodResolver } from '../utils/customZodResolver';
import * as z from 'zod';

const schema = z.object({
  userId: z
    .string()
    .min(2, 'Name should have atleast 2 characters')
    .min(1, { error: 'User ID is mandatory' }),
  //same as .nonempty({ error: 'User ID is mandatory' }),
  // Always keep .nonempty() at end
  password: z.string().nonempty('Password is required'),
});

export const ZodValidationSequenceForm = () => {
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: customZodResolver(schema),
    // mode: 'onSubmit', //default
    // reValidateMode: 'onChange', //default
  });

  const handleChange = async (e) => {
    if (hasSubmittedOnce) {
      await trigger(e.target.name);
      // manually validate a particular field, returns a Promise
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (d) => console.log('Submitted', d),
          (err) => {
            console.error('Submit err', err);
            setHasSubmittedOnce(true);
          }
        )}
      >
        <input
          type='text'
          {...register('userId', {
            onChange: handleChange,
            // using zod instead of:
            //   required: 'User ID is mandatory',
            //   minLength: {
            //     value: 2,
            //     message: 'Name should have atleast 2 characters',
            //   },
          })}
        />
        {errors.userId && <p role='alert'>{errors.userId.message}</p>}

        <input
          type='password'
          {...register('password', {
            // using zod instead of:
            // required: 'Password is required',
            onChange: handleChange,
          })}
        />
        {errors.password && <p role='alert'>{errors.password.message}</p>}

        <input type='submit' />
      </form>
    </>
  );
};
