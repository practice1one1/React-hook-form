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
          <ConditionalField
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

const ConditionalField = ({ control, register, index }) => {
  const fieldGroupsArray = useWatch({
    control,
    name: "fieldGroupsArray",
  });

  return (
    <>
      {fieldGroupsArray[index]?.conditionalField === "test1" && ( // only conditionally render <input>s for particular fieldGroups
        <input
          type="text"
          {...register(`fieldGroupsArray.${index}.conditionalField`)} // connect / register this <input> to that 2nd object in the fieldGroupsArray such that any changes to it may be made via this <input>
        />
      )}
      {/* OR: */}
      <input
        type="text"
        s
        {...register(`fieldGroupsArray.${index}.conditionalField`)}
        style={{
          display:
            fieldGroupsArray[index]?.conditionalField === "test1"
              ? "block"
              : "none",
        }}
      />
    </>
  );
};
