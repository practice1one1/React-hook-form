import React from "react";
import { useForm } from "react-hook-form";
import z, { check } from "zod";

export const AsyncValidationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const checkUsernameExists = React.useCallback(async (username) => {
    try {
      // echoing back dummy http response (reposnse body includes "isExisting" flag. But in real world example, http status code 200/400/409 etc. would be used for success/failure)
      const res = await fetch(
        `https://echo.free.beeceptor.com?username=${username}`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            isExisting: Math.random() > 0.5,
          }),
        }
      );
      const resBody = await res.json();

      return resBody.parsedBody.isExisting;
    } catch (error) {
      console.log("Fetch err:", error);
    }
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (d) => console.log("Submitted", d),
          (err) => console.error("Submit error:", err)
        )}
      >
        <input
          type="text"
          {...register("username", {
            required: "Username is required",
            validate: async (value) => {
              const isExisting = await checkUsernameExists(value);
              return !isExisting || "Username already exists";
            },
          })}
        />

        <input type="submit" />
      </form>
    </>
  );
};
