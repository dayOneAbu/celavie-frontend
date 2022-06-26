import { useForm } from "react-hook-form";
import useOrder from "../hooks/useOrder";
import { getStoredData } from "../utils/storageHelper";
import AppButton from "./shared/AppButton";

export default function PaymentRef() {
  const { register, handleSubmit } = useForm();
  const { updateOrder } = useOrder();
  const id = getStoredData("orderID");
  return (
    <form
      onSubmit={handleSubmit((formData) => {
        updateOrder.mutate({ id, formData });
      })}
      className="mt-4"
    >
      <div>
        <label
          htmlFor="paymentRefNo"
          className="block text-sm font-medium text-gray-700"
        >
          insert Payment reference
        </label>
        <div className="mt-1">
          <input
            {...register("paymentRefNo")}
            id="paymentRefNo"
            name="paymentRefNo"
            type="text"
            className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
          />
        </div>
      </div>
      <AppButton
        type="submit"
        className="flex mt-1 justify-center w-20 px-2 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-full shadow-sm"
      >
        submit
      </AppButton>
    </form>
  );
}
