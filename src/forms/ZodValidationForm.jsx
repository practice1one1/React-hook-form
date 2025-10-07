import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  personal: z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    age: z
      .number('Please enter a valid age number')
      .gte(18, 'Must be 18 or older')
      .optional(),
  }),
  company: z.object({
    employeeId: z.string().regex(/^VVS-/, 'Employee ID must start with VVS-'),
    position: z.enum(
      ['Director', 'Manager', 'Worker'],
      'Position is either Director, Manager or Worker'
    ),
  }),
});

export const ZodValidationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange', // revalidtes on every input
    reValidateMode: 'onBlur', // revalidates also upon input losing focus
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <pre>{JSON.stringify(errors, null, 2)}</pre>
      <fieldset>
        <legend>Personal details</legend>
        <label>
          Name:
          <input type='text' {...register('personal.name')} />
        </label>
        {errors.personal?.name && (
          <p role='alert'>{errors.personal?.name.message}</p>
        )}

        <label>
          Age:
          <input
            type='text'
            {...register('personal.age', {
              valueAsNumber: true,
              setValueAs: (age) => Math.round(age),
            })}
          />
        </label>
        {errors.personal?.age && (
          <p role='alert'>{errors.personal?.age.message}</p>
        )}
      </fieldset>

      <fieldset>
        <legend>Company related</legend>
        <label>
          Employee ID:
          <input type='text' {...register('company.employeeId')} />
        </label>
        {errors.company?.employeeId && (
          <p role='alert'>{errors.company?.employeeId.message}</p>
        )}

        <div>
          Position:
          <label>
            Director
            <input
              type='radio'
              {...register('company.position')}
              value={'Director'}
            />
          </label>
          <label>
            Manager
            <input
              type='radio'
              {...register('company.position')}
              value={'Manager'}
            />
          </label>
          <label>
            Worker
            <input
              type='radio'
              {...register('company.position')}
              value={'Worker'}
            />
          </label>
        </div>
        {errors.company?.position && (
          <p role='alert'>{errors.company?.position.message}</p>
        )}
      </fieldset>

      <input type='submit' />
    </form>
  );
};
