import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  age: z.number().gte(18, "Must be 18 or older").optional(),
  employeeId: z.string().regex(/^VVS-/, "Employee ID must start with VVS-"),
});

export const ZodValidationForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <fieldset>
        <legend>Personal details</legend>
        <label>
          Name:
          <input type="text" {...register("name")} />
        </label>
        <label>
          Age:
          <input type="text" {...register("age")} />
        </label>
      </fieldset>

      <fieldset>
        <legend>Company related</legend>
        <label>
          Employee ID:
          <input type="text" {...register("employeeId")} />
        </label>
      </fieldset>

      <input type="submit" />
    </form>
  );
};
