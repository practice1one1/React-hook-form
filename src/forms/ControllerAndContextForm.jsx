import React from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  useController,
} from "react-hook-form";
import z from "zod";
import { customZodResolver } from "../utils/customZodResolver";

const controllerAndContextSchema = z.object({
  customerInfo: z.object({
    firstName: z
      .string()
      .min(2, "First name is required to be at least 2 characters"),
    lastName: z.string().optional(),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
  }),
  items: z
    .array(z.object({ name: z.string(), price: z.number() }))
    .min(1, "Purchase at least one item"),
  paymentMethod: z
    .object({
      method: z.literal(["card", "cash", "bank_transfer"]).default("card"),
      expiryDate: z.preprocess(
        (dateString) => (dateString === "" ? undefined : dateString),
        z.coerce.date("Please enter a valid date").optional()
      ),
    })
    .refine(
      (data) => {
        if (data.method === "card") {
          return data.expiryDate !== undefined;
        }
        return true;
      },
      {
        error: "Expiry date is required when payment method is card",
        path: ["expiryDate"],
      }
    ),
});

export const ControllerAndContextForm = () => {
  const methods = useForm({
    defaultValues: {
      customerInfo: {
        firstName: "",
        lastName: "",
        state: "",
        city: "",
      },
      items: [],
      paymentMethod: {
        method: "card",
        expiryDate: "",
      },
    },
    resolver: customZodResolver(controllerAndContextSchema),
  });

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(
          (d) => console.log("Submitted", d),
          (err) => console.error("Submit error:", err)
        )}
      >
        <CustomerInfo />
        <Items />
        <PaymentMethod />

        <input type="submit" />
      </form>
    </FormProvider>
  );
};

const CustomerInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <h3>Customer Information</h3>
      <input
        type="text"
        {...register("customerInfo.firstName")}
        placeholder="First name"
      />
      {errors["customerInfo.firstName"] && ( // Note: due to use of `customZodResolver`, field errors are not nested but flattened with dot notation i.e. accessed as a string key
        <p role="alert">{errors["customerInfo.firstName"].message}</p>
      )}

      <input
        type="text"
        {...register("customerInfo.lastName")}
        placeholder="Last name"
      />
      {errors["customerInfo.lastName"] && (
        <p role="alert">{errors["customerInfo.lastName"].message}</p>
      )}

      <input
        type="text"
        {...register("customerInfo.state")}
        placeholder="State"
      />
      {errors["customerInfo.state"] && (
        <p role="alert">{errors["customerInfo.state"].message}</p>
      )}

      <input
        type="text"
        {...register("customerInfo.city")}
        placeholder="City"
      />
      {errors["customerInfo.city"] && (
        <p role="alert">{errors["customerInfo.city"].message}</p>
      )}
    </>
  );
};

const Items = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { field } = useController({
    name: "items",
    control,
  });

  const items = [
    { name: "grocery", price: 20 },
    { name: "electronics", price: 200 },
    { name: "clothing", price: 50 },
  ];

  const handleItemSelect = (e) => {
    const selectedItem = e.target.value;
    const currentItems = field.value || [];

    if (e.target.checked) {
      field.onChange([
        ...currentItems,
        items.find((item) => item.name === selectedItem),
      ]);
    } else {
      field.onChange(currentItems.filter((item) => item.name !== selectedItem));
    }
  };

  return (
    <div>
      <h3>Choose Items to Purchase</h3>
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <label>
              <input
                type="checkbox"
                value={item.name}
                onChange={handleItemSelect}
                checked={
                  field.value?.some((i) => i.name === item.name) || false
                }
              />
              {item.name} - ${item.price}
            </label>
          </li>
        ))}
      </ul>
      {errors.items && <p role="alert">{errors.items.message}</p>}
    </div>
  );
};

const PaymentMethod = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <h3>Payment Method</h3>
      <select {...register("paymentMethod.method")} defaultValue={"card"}>
        <option value="card">Card</option>
        <option value="cash">Cash</option>
        <option value="bank_transfer">Bank Transfer</option>
      </select>
      {errors.paymentMethod && (
        <p role="alert">{errors.paymentMethod.message}</p>
      )}

      <input
        type="date"
        {...register("paymentMethod.expiryDate")}
        placeholder={"Expiry Date"}
      />
      {errors["paymentMethod.expiryDate"] && (
        <p role="alert">{errors["paymentMethod.expiryDate"].message}</p>
      )}
    </>
  );
};
