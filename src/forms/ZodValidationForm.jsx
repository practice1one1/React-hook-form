import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { customZodResolver } from "../utils/customZodResolver.js";
import "../style/ZodValidationForm.css";

const schema = z.object({
  personal: z.object({
    name: z
      .string("Name should be a valid string")
      .trim()
      .min(2, {
        error: () =>
          // error map function
          `${Date.now()} - Use more than ateast 2 characters for your name`,
      })
      .optional(),
    age: z
      .number("Please enter a valid age number")
      .gte(60, "Error msg for age between 40 to 59 years") // the correct order to allow susequent overriding if needed
      .gte(40, "Error msg for age between 20 to 39 years")
      .gte(20, "Error msg for age between 0 to 19 years")
      .lte(100, { error: "You are too old to register" })
      .optional(),
  }),
  // company: z.object({
  // employeeId: z
  //   .union([z.string().regex(/^VVS-/), z.string().regex(/^CCP-/)])
  //   .optional(), // OR combine regexes: employeeId: z.string().regex(/^(?:VVS-|CCP-)/),
  // employeeId2: z.union([z.string(), z.number()]).optional(),
  // position: z.literal(['Director', 'Manager', 'Worker']).optional(),
  // }),
  customer: z.object({
    //   rating: z.emoji().optional(),
    rating2: z.number().gte(100, {
      error: (issue) => {
        return issue.input >= 90 ? "Number is close to 100" : undefined; // returning undefined resorts to the default error messeage zod provides in error.issues[idx].message
      },
    }),
    // email: z.email(),
    // facebookAC: z.url().refine(
    //   (val) => {
    //     // using .refine() along with .url() seems to skip URL validation in z.url(). Hence wrap in a try...catch since invalid url may be passed to new URL() which may throw
    //     try {
    //       const url = new URL(val);
    //       return (
    //         url.hostname === 'facebook.com' ||
    //         url.hostname.endsWith('.facebook.com')
    //       );
    //     } catch (err) {
    //       return false;
    //     }
    //   },
    //   { error: 'Improper FB url!', abort: true } // using abort runs no more error map functions
    // ),
  }),
});
export const ZodValidationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: customZodResolver(schema),
    // mode: 'onChange', // default "onSubmit". Defines validation sequence before submit
    // reValidateMode: 'onChange', // default "onChange". Defines validation sequence after submit (when errors appear)
    // By default validation runs initially upon submit then on each input
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <fieldset>
        <legend>Personal details</legend>
        <label>
          Name:
          <input type="text" {...register("personal.name")} />
        </label>
        {/* I am not accessing `errors.personal.name` because the custom resolver
        sets the error objects with keys eg 'personal.name' string, instead of
        nesting the error objects. Either access errors by
        errors["personal.name"].message or modify the custom resolver to nest
        error objects */}
        {errors["personal.name"] && (
          <p role="alert">{errors["personal.name"].message}</p>
        )}

        <label>
          Age:
          <input
            type="text"
            {...register("personal.age", {
              // valueAsNumber: true, // can't set valueAsNumber() + setValueAs() together acc to rules
              setValueAs: (age) => Math.floor(age), // No submitting decimal age values
            })}
          />
        </label>
        {errors["personal.age"] && (
          <p role="alert">{errors["personal.age"].message}</p>
        )}
      </fieldset>

      <fieldset>
        <legend>Company related</legend>
        <label>
          Employee ID:
          <input type="text" {...register("company.employeeId")} />
        </label>
        {errors["company.employeeId"] && (
          <p role="alert">{errors["company.employeeId"].message}</p>
        )}

        <label>
          Employee ID 2:
          <input
            type="text"
            {...register("company.employeeId2", {
              setValueAs: (data) =>
                Number.isNaN(Number(data)) ? String(data) : Number(data), // employeeId2 is either a string or number. I avoided {setValueAsNumber: true} because it could return NaN if a string is passed
            })}
          />
        </label>
        {errors["company.employeeId2"] && (
          <p role="alert">{errors["company.employeeId2"].message}</p>
        )}

        <div>
          Position:
          <label>
            <input
              type="radio"
              {...register("company.position")}
              value={"Director"}
            />
            Director
          </label>
          <label>
            <input
              type="radio"
              {...register("company.position")}
              value={"Manager"}
            />
            Manager
          </label>
          <label>
            <input
              type="radio"
              {...register("company.position")}
              value={"Worker"}
            />
            Worker
          </label>
        </div>
        {errors["company.position"] && (
          <p role="alert">{errors["company.position"].message}</p>
        )}
      </fieldset>

      <fieldset>
        <legend>Customer related</legend>
        <div>
          Rating:
          <label>
            🙂
            <input type="radio" {...register("customer.rating")} value={"🙂"} />
          </label>
          <label>
            😑
            <input type="radio" {...register("customer.rating")} value={"😑"} />
          </label>
          <label>
            🙁
            <input type="radio" {...register("customer.rating")} value={"🙁"} />
          </label>
        </div>
        {errors["customer.rating"] && (
          <p role="alert">{errors["customer.rating"].message}</p>
        )}

        <label>
          Rating 2 (greater than 100, or atleast above 90 😉):
          <input
            type="number"
            {...register("customer.rating2", { valueAsNumber: true })}
          />
        </label>
        {errors["customer.rating2"] && (
          <p role="alert">{errors["customer.rating2"].message}</p>
        )}

        <label>
          Email Address:
          <input type="email" {...register("customer.email")} />
        </label>
        {errors["customer.email"] && (
          <p role="alert">{errors["customer.email"].message}</p>
        )}

        <label>
          Facebook (Optional):
          <input type="text" {...register("customer.facebookAC")} />
        </label>
        {errors["customer.facebookAC"] && (
          <p role="alert">{errors["customer.facebookAC"].message}</p>
        )}
      </fieldset>

      <input type="submit" />
    </form>
  );
};
