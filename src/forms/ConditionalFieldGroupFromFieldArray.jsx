import { useState } from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";

// [{id: 123, field1: "a"}, {id: 456, field1: "b"}] -> field groups (array)
// {id: 123, field1: "a"} -> field group
// field1 -> field name
// "a" -> field value

export const ConditionalFieldGroupFromFieldArray = () => {
  const { handleSubmit, register, control } = useForm({
    defaultValues: {
      fieldGroupsArray: [
        { conditionalField: "test" },
        { conditionalField: "test1" },
        { conditionalField: "test2" },
      ],
    },
  });
  const { fields: fieldGroupsArray, append } = useFieldArray({
    control,
    name: "fieldGroupsArray",
  });
  const [visibleFields, setVisibleFields] = useState(() => {
    const values = fieldGroupsArray.map(({ conditionalField }) =>
      String(conditionalField)
    );
    return values.filter((v) => v.includes("1") || v.includes("2"));
  });
  // console.log(visibleFields);

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
              visibleFields={visibleFields}
            />
          </div>
        ))}

        <input type="submit" />
      </form>

      <button
        onClick={() => {
          const newFieldVal = "test3";

          setVisibleFields([...visibleFields, newFieldVal]);
          append({ conditionalField: newFieldVal });
        }}
      >
        Append
      </button>
    </>
  );
};

const ConditionalField = ({ control, register, index, visibleFields }) => {
  const fieldGroup = useWatch({
    control,
    name: `fieldGroupsArray[${index}]`,
  });

  let shouldShow = false;
  if (fieldGroup) {
    shouldShow = visibleFields.includes(fieldGroup.conditionalField);
  }

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
