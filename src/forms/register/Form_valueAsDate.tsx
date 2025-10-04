import './styles.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function Practice() {
  const { register, handleSubmit } = useForm();
  const [result, setResult] = useState('');

  return (
    <div className='App'>
      <h2>React Hook Form Practice 1</h2>
      <form
        onSubmit={handleSubmit(
          (data) => {
            console.log('success: ', data);
            setResult(data.dateToday.toDateString());
          },
          (e) => {
            console.error('fail: ', e);
          }
        )}
      >
        <input
          // type={"date"}
          style={{ fontSize: '25px' }}
          {...register('dateToday', {
            valueAsDate: true,
          })}
        />
        <br />
        <br />

        <input
          style={{ fontSize: '15px', padding: '5px 10px' }}
          type={'submit'}
        />
      </form>

      <hr />
      <br />
      {result && <div style={{ color: 'white' }}>{result}</div>}
    </div>
  );
}
