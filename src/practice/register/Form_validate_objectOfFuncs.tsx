import "../styles.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Practice() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
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
        <label htmlFor="password">Password</label>
        <input
          id="password"
          style={{ fontSize: "20px" }}
          {...register("password", {
            minLength: { value: 1, message: "password too short" },
            maxLength: { value: 50, message: "password too long" },
          })}
        />
        <br />
        <br />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          style={{ fontSize: "20px" }}
          {...register("confirmPassword", {
            required: true,
            validate: {
              //pass an object to contain more than one validation function
              isSame: (valueOfThisInputOnly, allFormValues) => {
                //the first param accesses the value that this input box contains, while the 2nd param has all the FieldValues obj as it appears when submitted
                return (
                  //if any value apart from true is returned eg a string, it's treated as a failed validation hence an error message
                  allFormValues.password === valueOfThisInputOnly ||
                  "Not the same"
                );
              },
            },
          })}
        />
        <br />
        <br />

        <input
          style={{ fontSize: "13px", padding: "5px 10px" }}
          type={"submit"}
        />
      </form>

      <button
        style={{ fontSize: "13px", padding: "5px 10px", marginLeft: "20px" }}
        children={"Clear"}
        onClick={() => {
          reset();
          setIsValid(false);
        }}
      />
      <br />
      <br />

      {!isValid && errors.confirmPassword?.message && (
        <div className="message-box red">Password is not matching!</div>
      )}

      {isValid && (
        <div className="message-box lightgreen">Password confirmed</div>
      )}
    </div>
  );
}
