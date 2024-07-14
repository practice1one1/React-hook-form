// SKILLS IN THIS FORM
// -Show msg after clicking submit. On change of input values and re-click, show new msg.
// -Reset the inputs and state vars in useForm()
// -Use an object of more than one 'validate' functions on a registered input

import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormValues {
  password: string;
  confirmPassword: string
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();
  const [isValid, setIsValid] = useState(false);

  return (
    <div className="App">
      <h2>React Hook Form Practice 1</h2>
      <form
        onSubmit={handleSubmit(
          (data) => {
            console.log("success: ", data);
            setIsValid(true);
          },
          (e) => {
            console.error("fail: ", e);
            setIsValid(false);
          }
        )}
      >
        <input
          {...register("password", {
            validate: {
              //can pass a number of functions in this object and hook form calls them all
              isString: (v) => typeof v === "string" || "Enter a string",
              //this validation is useless coz even the number inputs are recorded as strings. You have to parseInt() to turn into a number
            },
          })}
        />
        <br />
        <br />
        <input
          {...register("confirmPassword", {
            validate: {
              isSame: (v, values) => {
                return (values.password && values.password === v) || "Not the same";
              },
            },
          })}
        />
        <br />
        <br />
        <input
          style={{ fontSize: "15px", padding: "5px 10px" }}
          type={"submit"}
        />
      </form>

      <button
        style={{ fontSize: "15px", padding: "5px 10px", marginLeft: "20px" }}
        children={"Clear"}
        onClick={() => {
          setIsValid(false);
          reset();
        }}
      />
      <br />
      <br />

      {!isValid && errors.confirmPassword?.message && (
        <div
          style={{
            backgroundColor: "black",
            color: "red",
            border: "3px solid red",
            padding: "5px 10px",
          }}
        >
          {typeof errors.confirmPassword?.message === "string" &&
            errors.confirmPassword?.message}
        </div>
      )}
      {isValid && ( //or use other formState props to check if no error
        <div
          style={{
            backgroundColor: "black",
            color: "lightgreen",
            border: "3px solid lightgreen",
            padding: "5px 10px",
          }}
        >
          Password Confirmed!
        </div>
      )}
    </div>
  );
}
