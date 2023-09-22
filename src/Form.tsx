import { useForm, Controller, FieldValues } from "react-hook-form";
import "./Form.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//Using the name prop (with "groupname.member" eg "address.street") of the controller comp, you can return a single object that groups other input-values together as prop-values
function Form() {
  const schema = z.object({
    name: z
      .string()
      .min(2, { message: "Name should be more than 2 characters" }),
    email: z.string(),
    address: z.object({
      street: z.string(),
      city: z.string(),
    }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) }); //other meths: getValues,

  const onSubmit = (data: FieldValues) => {
    // data will contain the form values, including the group in an object.
    console.log(data);
  };

  // Manually set the values of address fields
  const setAddressValues = () => {
    setValue("address.street", "123 Main St");
    setValue("address.city", "Example City");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="form-label mb-1">Name</label>
        <Controller //use Controller comp from hook-form to render diff elems
          name="name"
          control={control}
          render={({ field }) => (
            <input className="form-control mb-3 custom-bg" {...field} />
          )}
          //defaultValue="default_name" //sets a default value for the input, or any elem rendered
        />
      </div>

      <div>
        <label className="form-label mb-1">Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <input className="form-control mb-4 custom-bg" {...field} />
          )}
        />
      </div>

      <div>
        <label className="custom-label">ADDRESS</label>
        <div>
          <label className="form-label mb-1">Street</label>
          <Controller
            name="address.street"
            control={control}
            render={({ field }) => (
              <input className="form-control mb-3 custom-bg" {...field} />
            )}
          />
        </div>
        <div>
          <label className="form-label mb-1">City:</label>
          <Controller
            name="address.city"
            control={control}
            render={({ field }) => (
              <input className="form-control mb-3 custom-bg" {...field} />
            )}
          />
        </div>
      </div>

      <button
        type="button"
        className="btn btn-outline-light"
        onClick={setAddressValues}
      >
        Set Address
      </button>

      <button type="submit" className="btn btn-primary custom-button">
        Submit
      </button>
    </form>
  );
}

export default Form;
