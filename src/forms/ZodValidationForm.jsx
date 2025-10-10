import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { customZodResolver } from "../utils/customZodResolver.js";
import "../style/ZodValidationForm.css";

const schema = z.object({
  // personal: z.object({
  //   name: z.string().trim().min(2).optional(),
  //   age: z.number().gte(18).optional(),
  // }),
  // company: z.object({
  // employeeId: z
  //   .union([z.string().regex(/^VVS-/), z.string().regex(/^CCP-/)])
  //   .optional(), // OR combine regexes: employeeId: z.string().regex(/^(?:VVS-|CCP-)/),
  // employeeId2: z.union([z.string(), z.number()]).optional(),
  // position: z.literal(['Director', 'Manager', 'Worker']).optional(),
  // }),
  customer: z.object({
    //   rating: z.emoji().optional(),
    email: z.email(),
    facebookAC: z.url().refine(
      (val) => {
        // using .refine() along with .url() seems to skip URL validation in z.url(). Hence wrap in a try...catch since invalid url may be passed to new URL() which may throw
        try {
          const url = new URL(val);
          return (
            url.hostname === "facebook.com" ||
            url.hostname.endsWith(".facebook.com")
          );
        } catch (err) {
          return false;
        }
      }
      // { error: 'Improper FB url!', abort: true }
    ),
  }),
});
export const ZodValidationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: customZodResolver(schema),
    // mode: 'onChange', // revalidtes on every input otherwise runs only upon submit
    // reValidateMode: 'onBlur', // revalidates also upon input losing focus
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      <fieldset>
        <legend>Personal details</legend>
        <label>
          Name:
          <input type="text" {...register("personal.name")} />
        </label>
        {errors.personal?.name && (
          <p role="alert">{errors.personal?.name.message}</p>
        )}

        <label>
          Age:
          <input
            type="text"
            {...register("personal.age", {
              valueAsNumber: true,
              setValueAs: (age) => Math.round(age),
            })}
          />
        </label>
        {errors.personal?.age && (
          <p role="alert">{errors.personal?.age.message}</p>
        )}
      </fieldset>

      <fieldset>
        <legend>Company related</legend>
        <label>
          Employee ID:
          <input type="text" {...register("company.employeeId")} />
        </label>
        {errors.company?.employeeId && (
          <p role="alert">{errors.company?.employeeId.message}</p>
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
        {errors.company?.employeeId2 && (
          <p role="alert">{errors.company?.employeeId2.message}</p>
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
        {errors.company?.position && (
          <p role="alert">{errors.company?.position.message}</p>
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
        {errors.customer?.rating && (
          <p role="alert">{errors.customer.rating.message}</p>
        )}

        <label>
          Email Address:
          <input type="email" {...register("customer.email")} />
        </label>
        {errors.customer?.email && (
          <p role="alert">{errors.customer.email.message}</p>
        )}

        <label>
          Facebook (Optional):
          <input type="text" {...register("customer.facebookAC")} />
        </label>
        {errors.customer?.facebookAC && (
          <p role="alert">{errors.customer.facebookAC.message}</p>
        )}
      </fieldset>

      <input type="submit" />
    </form>
  );
};
