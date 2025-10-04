import './styles.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Practice() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const [isValid, setIsValid] = useState(false);

  return (
    <div className='App'>
      <h2>React Hook Form Practice</h2>
      <form
        onSubmit={handleSubmit(
          (data) => {
            console.log('success: ', data);
            setIsValid(true);
          },
          (e) => {
            console.error('fail: ', e);
            setIsValid(false);
          }
        )}
      >
        <label htmlFor='1' style={{ marginRight: '5px' }}>
          Number
        </label>
        <input
          id='1'
          style={{ fontSize: '20px' }}
          {...register('number', {
            min: { value: -1, message: 'number too short' },
            max: { value: 1000, message: 'number too big' },
            setValueAs: (stringValue) => {
              return 'DRD-ISBN - 00' + stringValue; //eg to use custom comapny codes
            },
          })}
        />
        <br />
        <br />

        <input className='button' type={'submit'} />
      </form>
      <br />

      <button
        className='button'
        children={'Clear'}
        onClick={() => {
          reset();
          setIsValid(false);
        }}
      />
      <br />
      <br />

      {!isValid && errors.number?.message && (
        <div className='message-box red'>
          {typeof errors.number?.message === 'string' && errors.number?.message}
        </div>
      )}

      {isValid && (
        <div className='message-box lightgreen'>
          Recorded: {getValues('number')}
        </div>
      )}
    </div>
  );
}
