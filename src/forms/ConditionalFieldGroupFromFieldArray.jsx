import { useForm, useFieldArray, useWatch } from "react-hook-form";

// [{id: 123, field1: "a"}, {id: 456, field1: "b"}] -> field groups (array)
// {id: 123, field1: "a"} -> field group
// field1 -> field name
// "a" -> field value

export const ConditionalFieldGroupFromFieldArray = () => {
  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      fieldGroupsArray: [
        // though each prop in objects here represents a separate field, "shouldShow" (as well as the "id" added by useFieldArray) are not fields but just like meta that affects the fields in rendering
        { conditionalField: "test", shouldShow: false },
        { conditionalField: "test1", shouldShow: true },
        { conditionalField: "test2", shouldShow: false },
      ],
    },
  });
  const { fields: fieldGroupsArray, append } = useFieldArray({
    control,
    name: "fieldGroupsArray",
  });

  return (
    <>
      <form onSubmit={handleSubmit((d) => console.log(d))}>
        {fieldGroupsArray.map((fieldGroup, index) => (
          <div key={fieldGroup.id}>
            {/* <input
              type="text"
              {...register(`fieldGroupsArray.${index}.conditionalField`)}
            /> */}
            <ConditionalField
              control={control}
              register={register}
              index={index}
            />
          </div>
        ))}

        <input type="submit" />
      </form>

      <button
        onClick={() => append({ conditionalField: "test3", shouldShow: true })}
      >
        Append
      </button>
    </>
  );
};

const ConditionalField = ({ control, register, index }) => {
  const shouldShow = useWatch({
    control,
    name: `fieldGroupsArray[${index}].shouldShow`,
  });

  return (
    <>
      {shouldShow && ( // only conditionally render <input>s for particular fieldGroups
        <>
          <input
            type="text"
            {...register(`fieldGroupsArray.${index}.conditionalField`)} // connect / register this <input> to that 2nd object in the fieldGroupsArray such that any changes to it may be made via this <input>
          />
        </>
      )}
      {/* OR: */}
      {/* <input
        type="text"
        s
        {...register(`fieldGroupsArray.${index}.conditionalField`)}
        style={{
          display:
            shouldShow
              ? "block"
              : "none",
        }}
      /> */}
    </>
  );
};
