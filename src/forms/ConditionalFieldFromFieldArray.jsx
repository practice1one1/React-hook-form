// DIFFERENCE BETWEEN ConditionalFieldGroupFromFieldArray & ConditionalFieldFromFieldArray file:
// ConditionalFieldGroupFromFieldArray - demonstrates a bunch of visible fields stored in state at the top level
// ConditionalFieldFromFieldArray - demonstrates rendering an extra field, conditionally, below an always-rendered field, basing on the current value of that field
// (Use better naming next time or create separate file with new code)
// See ConditionalFieldsForm (new)

import { useForm, useFieldArray, useWatch } from "react-hook-form";

// [{id: 123, field1: "a"}, {id: 456, field1: "b"}] -> field groups (array)
// {id: 123, field1: "a"} -> field group
// field1 -> field name
// "a" -> field value

export const ConditionalFieldFromFieldArray = () => {
  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      fieldGroupsArray: [
        { conditionalField: "test" },
        { conditionalField: "test1" },
        { conditionalField: "test2" },
      ],
    },
  });
  const { fields: fieldGroupsArray } = useFieldArray({
    control,
    name: "fieldGroupsArray",
  });

  return (
    <form onSubmit={handleSubmit((d) => console.log(d))}>
      {fieldGroupsArray.map((fieldGroup, index) => (
        <div key={fieldGroup.id}>
          <ConditionalFieldGroup
            control={control}
            register={register}
            index={index}
          />
        </div>
      ))}

      <input type="submit" />
    </form>
  );
};

const ConditionalFieldGroup = ({ control, register, index }) => {
  const conditionalField = useWatch({
    control,
    name: `fieldGroupsArray.${index}.conditionalField`, // watch specific field value instead of whole array to prevent unnecessary re-renders of this component by useWatch() when other field values change
  });

  return (
    <>
      <input {...register(`fieldGroupsArray.${index}.conditionalField`)} />
      {conditionalField === "test1" && ( // only conditionally render <input>s / extra fields  basing on the value of a particular field
        <input
          type="text"
          {...register(
            `fieldGroupsArray.${index}.extraFieldBasedOnConditionalFieldValue`
          )} // connect / register this <input> to that 2nd object in the fieldGroupsArray such that any changes to it may be made via this <input>
        />
      )}
    </>
  );
};
