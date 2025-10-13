import React, { useState } from "react";
import ReactSelect from "react-select";
import * as z from "zod";
import {
  colorOptions,
  flavourOptions,
  groupedOptions,
} from "../data/ReactSelectOptions";
import { Controller, useForm } from "react-hook-form";
import { customZodResolver } from "../utils/customZodResolver";

const schema = z.object({
  colorsOrFlavours: z.object(
    {
      label: z.string().refine(
        (label) => {
          const isPresentInColors = colorOptions.find((o) => o.label === label);
          const isPresentInFlavours = flavourOptions.find(
            (o) => o.label === label
          );
          return isPresentInColors || isPresentInFlavours;
        },
        { error: "Invalid option", abort: true } // abort flag prevents further validation checks if this first one fails
      ),
      value: z.literal([
        "red",
        "blue",
        "green",
        "yellow",
        "vanilla",
        "orange",
        "raspberry",
      ]),
      isDisabled: z.boolean().optional(),
      isFixed: z.boolean().optional(),
      rating: z
        .number()
        .min(0, "Please provide a rating between 0 and 1")
        .max(1, "Please provide a rating between 0 and 1")
        .optional(),
    },
    { error: "Please select an option" }
  ),
});

// styles for each group's label:
const formatGroupLabel = (groupedData) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e0efffff",
    }}
  >
    <span>{groupedData.label}</span>
    <span
      style={{
        marginLeft: "10px",
        backgroundColor: "#0045b5ff",
        color: "#fff",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      {groupedData.options.length}
    </span>
  </div>
);
// Find how to set the width of the options-dialog as it can't be set in the format of the group-options label above

export const ControllerSelectForm = () => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      colorsOrFlavours: null,
    },
    resolver: customZodResolver(schema),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(
          (d) => console.log(d),
          (err) => console.error("Submit err:", err)
        )}
      >
        <Controller
          name="colorsOrFlavours"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <>
                {field.value?.label && (
                  <p>Selected option is {field.value.label}</p>
                )}
                <ReactSelect
                  ref={field.ref} // earlier versions used inputRef
                  onChange={field.onChange} // react-select's onChange emits/provides directly the newValue object (as in colorOptions) instead of emitting the Event object. While hook form's onChange is configured to receive Event object as arg, though here it is being passed a colorOption object and it worked
                  onBlur={field.onBlur}
                  value={field.value}
                  options={groupedOptions}
                  placeholder={"Select a color or flavour..."}
                  formatGroupLabel={formatGroupLabel}
                  isClearable
                />
                {fieldState.error && (
                  <p role="alert">{fieldState.error.message}</p>
                )}
              </>
            );
          }}
        />

        <input type="submit" />
      </form>
      <button
        onClick={() =>
          reset(
            {
              colorsOrFlavours: null,
            },
            {
              keepTouched: true,
              keepDirty: false,
            }
          )
        }
      >
        Reset selection
      </button>
    </>
  );
};
