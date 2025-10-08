import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import '../style/ZodValidationForm.css';

const schema = z.object({
  personal: z.object({
    name: z.string().trim().min(2),
    age: z.number().gte(18).optional(),
  }),
  company: z.object({
    employeeId: z.union([z.string().regex(/^VVS-/), z.string().regex(/^CCP-/)]), // OR combine regexes: employeeId: z.string().regex(/^(?:VVS-|CCP-)/),
    position: z.literal(['Director', 'Manager', 'Worker']),
  }),
  customer: z.object({
    rating: z.literal(['good', 'average', 'bad']),
  }),
});
export const ZodValidationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    // mode: 'onChange', // revalidtes on every input otherwise runs only upon submit
    // reValidateMode: 'onBlur', // revalidates also upon input losing focus
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
            <input
              type='radio'
              {...register('company.position')}
              value={'Director'}
            />
            Director
          </label>
          <label>
            <input
              type='radio'
              {...register('company.position')}
              value={'Manager'}
            />
            Manager
          </label>
          <label>
            <input
              type='radio'
              {...register('company.position')}
              value={'Worker'}
            />
            Worker
          </label>
        </div>
        {errors.company?.position && (
          <p role='alert'>{errors.company?.position.message}</p>
        )}
      </fieldset>

      <fieldset>
        <legend>Customer related</legend>
        <div>
          Rating:
          <label>
            🙂
            <input
              type='radio'
              {...register('customer.rating')}
              value={'good'}
            />
          </label>
          <label>
            😑
            <input
              type='radio'
              {...register('customer.rating')}
              value={'average'}
            />
          </label>
          <label>
            🙁
            <input
              type='radio'
              {...register('customer.rating')}
              value={'bad'}
            />
          </label>
        </div>
        {errors.customer?.rating && (
          <p role='alert'>{errors.customer.rating.message}</p>
        )}
      </fieldset>

      <input type='submit' />
    </form>
  );
};
