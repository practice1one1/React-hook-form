import React from 'react';
import { Form, useForm } from 'react-hook-form';

export const ExternalServicesForm = () => {
  const { register, handleSubmit, control } = useForm();

  // function onSubmitData(formData) {
  //   fetch('/api/post', { // proxying reqs through vite dev server
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('Server echoed back:', data);
  //       // you can inspect data.json, data.headers, etc.
  //     })
  //     .catch((err) => {
  //       console.error('Error:', err);
  //     });
  // }
  // return (
  //   <form onSubmit={handleSubmit(onSubmitData)}>
  //     <label>
  //       First Name:
  //       <input
  //         {...register('first-name', {
  //           required: { value: true, message: 'First name is required!' },
  //         })}

  //       />
  //     </label>

  //     <input type='submit' value='Submit' />
  //   </form>
  // );

  // Using <Form> (BETA) to handle posting to external service efficiently instead of handleSubmit
  return (
    <Form
      action='/api' // proxying reqs through vite dev server
      control={control}
      onSuccess={(resp) => console.log('Submission successful', resp)}
      onError={(resp) => console.log('Submission failed', resp)}
    >
      <input {...register('name')} />
      <input
        type='email'
        {...register('email', {
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Please enter a valid email!',
          },
        })}
      />
      <button>Submit</button>
    </Form>
  );
};
