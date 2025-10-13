import React from "react";
import { useForm } from "react-hook-form";
import "../style/ValidateFunctionsForm.css";
import { checkUsername } from "../../mocks/checkUsername";

const ValidateFunctionsForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log("Submitted", d))}>
        <fieldset>
          <select {...register("gender")}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <legend>Prefixed Name</legend>
          <input
            type="text"
            placeholder="Enter Your name but include name prefix eg Mr. OR Mrs. and hit ENTER"
            {...register("prefix-name", {
              validate: {
                // runs all funcs in this obj INITIALLY UPON SUBMIT then on every render if form is modified
                validationFunc: function (currentInput, allFormValues) {
                  console.log("currentInput: ", currentInput);
                  console.log("allFormValues: ", allFormValues);

                  return true;
                },
                isCorrectPrefix: function (name, allFormValues) {
                  if (allFormValues.gender === "male") {
                    return name.includes("Mr");
                  }

                  if (allFormValues.gender === "female") {
                    return name.includes("Mrs");
                  }
                  return false;
                },
              },
            })}
            style={{ width: "700px" }}
          />
          {/* Can write error messages below according to error type. Best is to write error messages while passing options in register() (See username input below) */}
          {errors["prefix-name"]?.type === "isCorrectPrefix" && (
            <p role="alert">Please enter a correct prefix</p>
          )}
        </fieldset>

        <fieldset>
          <legend>New User Name</legend>
          <input
            type="text"
            placeholder="Never used before, is without spaces, and not starting with numbers"
            {...register("username", {
              required: "A username is mandatory",
              minLength: {
                value: 2,
                message: "Use a name with alteast 2 characters",
              },
              validate: {
                noSpaces: (name) =>
                  !/\s/.test(name) || "Username should not have spaces",
                noNumberStart: (name) =>
                  !/^[0-9]/.test(name) ||
                  "Username should not start with a number",
                isNotInDB: async (name) => {
                  const exists = await checkUsername(name);
                  return (
                    !exists ||
                    "Username is already taken up. Use a different name"
                  );
                },
              },
            })}
          />
          {errors.username && (
            // Set error messages during passing options in register(). Access any error message and display below instead of setting individual messages down here
            <p role="alert">{errors.username.message}</p>
          )}
        </fieldset>

        <input type="submit" />
      </form>
    </>
  );
};

export default ValidateFunctionsForm;
