import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  firstname: "default firstname",
  lastname: "default lastname",
};

export const GetValuesForm = () => {
  const {
    register,
    getValues, // calling getValues() returns the initial values + current values in names obj
  } = useForm({
    defaultValues,
  });
  const [state, setState] = useState(0);

  useEffect(() => {
    console.log(
      "Current form values on re-calling effect / re-rendering: ",
      getValues(), // calling getValues() HERE returns form values on re-render
    );
  }, [state]);

  return (
    <>
      <form>
        <input {...register("names.firstname")} />
        <br />
        <br />
        <input {...register("names.lastname")} />
        <br />
        <br />
      </form>

      <button
        onClick={
          () =>
            console.log(
              "Current form values on calling a handler: ",
              getValues(),
            ) // calling getValues() here returns form values upon triggering handler
        }
      >
        Console log current form values on triggering an event (click)
      </button>
      <br />
      <br />

      <button onClick={() => setState(state + 1)}>
        Console log current form values on running effect hook / re-rendering
      </button>
    </>
  );
};
// can also call in async handler
