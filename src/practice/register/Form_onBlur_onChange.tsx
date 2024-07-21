import "../styles.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Practice() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const [text, setText] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="App">
      <h2>React Hook Form Practice</h2>
      <form
        onSubmit={handleSubmit(
          (data) => {
            console.log("success: ", data);
            setIsValid(true)
          },
          (e) => {
            console.error("fail: ", e);
            setIsValid(false);
          }
        )}
      >
        <label htmlFor="1" style={{ marginRight: "5px" }}>
          Number
        </label>
        <input
          id="1"
          style={{ fontSize: "20px" }}
          onClick={() => setIsFocused(true)}
          {...register("number", {
            min: { value: 0, message: "number too short" },
            max: { value: 1000, message: "number too big" },
            onChange(event) {
              //Note that whenever this onChange runs, it also causes re-rendering everytime just like clicking any button inside the <form> tags causes automatic form submission
              setText(event.target.value);
            },
            onBlur(event) { //when input is focused or unfocused
              setIsFocused(!isFocused); //always set it to opposite of current boolean value
            },
          })}
        />
        <br />
        <br />

        {/* <input className="button" type={"submit"} /> */}
        <button className="button" type="submit">Submit</button>
      </form>
      <br />

      <button
        className="button"
        children={"Clear"}
        onClick={() => {
          reset();
          setIsValid(false);
        }}
      />
      <br />
      <br />

      {!isValid && errors.number?.message && (
        <div className="message-box red">
          {typeof errors.number?.message === "string" && errors.number?.message}
        </div>
      )}

      {isValid && (
        <div className="message-box lightgreen">
          Recorded: {getValues("number")} {/* getValues accesses the currently recorded input data */}
        </div>
      )}

      <div className="message-box lightblue">
        {isFocused === false ? "Click on Number input box" : "Fill in a number"}
      </div>

      {text && <div className="message-box lightgreen">Text: {text}</div>}
    </div>
  );
}
