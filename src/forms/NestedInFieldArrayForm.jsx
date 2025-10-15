import { useState } from "react";
import { Controller, useFieldArray, useForm, useWatch } from "react-hook-form";

// [{id: 123, field1: "a"}, {id: 456, field1: "b"}] -> field groups (array)
// {id: 123, field1: "a"} -> field group
// field1 -> field name
// "a" -> field value

export const NestedInFieldArrayForm = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      fieldGroupsArray: [
        {
          field1: "val-1",
        },
      ],
    },
  });
  const {
    fields: fieldGroups,
    remove,
    append,
    update,
  } = useFieldArray({
    control,
    name: "fieldGroupsArray",
  });

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        <ul>
          {fieldGroups.map((fieldGroup, index) => (
            <li key={fieldGroup.id}>
              <Edit
                fieldGroup={fieldGroup}
                update={update}
                index={index}
                control={control}
              />
            </li>
          ))}
        </ul>

        <button type="button" onClick={() => append({ field1: "appended" })}>
          Append New Field Group
        </button>
        <input type="submit" value="Submit all Field Groups (to server)" />
      </form>
    </>
  );
};

const Edit = ({ fieldGroup: fieldGroupObj, update, index, control }) => {
  const { handleSubmit, register } = useForm({
    defaultValues: fieldGroupObj,
  });

  return (
    <>
      <Display control={control} index={index} />
      <input {...register("field1")} />
      <button
        onClick={handleSubmit((newFieldGroupObj) =>
          update(index, newFieldGroupObj)
        )}
      >
        Submit This Field Group (to Local Fields-Array)
      </button>
    </>
  );
};

const Display = ({ control, index }) => {
  const fieldGroup = useWatch({
    control,
    name: `fieldGroupsArray.${index}`,
  });

  return (
    <p style={{ fontSize: "15px", color: "#aaa" }}>
      Value in field-array: {fieldGroup?.field1}
    </p>
  );
};
