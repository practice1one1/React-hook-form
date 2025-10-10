import { FieldErrors, FieldValues, FieldError } from "react-hook-form";
import { ZodError, ZodType } from "zod";

function zodToHookFormError(zodError: ZodError): FieldErrors {
  let errors: FieldErrors = {};

  for (const issue of zodError.issues) {
    const path = issue.path.join(".");
    errors[path] = {
      type: issue.code,
      message: issue.message,
    } as FieldError;
  }

  return errors;
}

export const customZodResolver = (
  schema: ZodType
): ((values: FieldValues) => { values: FieldValues; errors: FieldErrors }) => {
  return (values) => {
    try {
      const result = schema.safeParse(values);
      if (result.success) {
        return {
          values: result.data as FieldValues,
          errors: {},
        };
      } else {
        return {
          errors: zodToHookFormError(result.error),
          values: {},
        };
      }
    } catch (err) {
      console.error("Resolver Error: ", err);
      return {
        values: {},
        errors: {
          root: {
            type: "unknown",
            message: "An unknown error occured during validation by zod",
          } as FieldError,
        },
      };
    }
  };
};
