import React from "react";
import { useForm } from "react-hook-form";

export const ShouldUnregisterForm = () => {
  const { register, watch, handleSubmit } = useForm({
    // shouldUnregister: true, // submitted form will either have contactOption and tel or contactOption and email, but not both tel and email with one filled and other empty
  });

  const contactOption = watch("contactOption", "tel");

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <select {...register("contactOption")}>
        <option value={"tel"}>Telephone</option>
        <option value={"email"}>Email</option>
      </select>

      {contactOption === "tel" && (
        <div>
          <label>
            Telephone
            <input
              type="tel"
              {...register("tel", { shouldUnregister: true })} // or invoke in useForm() options
            />
          </label>
        </div>
      )}

      {contactOption === "email" && (
        <div>
          <label>
            Email address
            <input
              type="email"
              {...register("email", { shouldUnregister: true })}
            />
          </label>
        </div>
      )}

      <input type="submit" />
    </form>
  );
};
