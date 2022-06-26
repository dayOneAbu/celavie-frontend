import { useForm } from "react-hook-form";
import { Error, Layout } from "../components";
import useCart from "../hooks/useCart";
import { nopeResolver } from "@hookform/resolvers/nope";
import Nope from "nope-validator";
import useOrder from "../hooks/useOrder";

const paymentMethods = [
  { id: "cash", title: "cash on delivery" },
  { id: "online", title: "Telebirr" },
];

const schema = Nope.object().shape({
  receiverPhone: Nope.string()
    .atLeast(9)
    .required("please provide Phone Number"),
  shippingAddress: Nope.string()
    .atLeast(4)
    .required("please provide delivery Address"),
});

export default function CheckoutPage() {
  const { cartItems, subTotal } = useCart();
  const { placeOrder } = useOrder();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: nopeResolver(schema),
  });

  return (
    <Layout>
      <main className="grid grid-cols-1 gap-x-16 max-w-7xl mx-auto  lg:grid-cols-2">
        <section className="bg-orange-500 text-white  lg:px-8 py-12 md:px-10 lg:w-full lg:py-24 lg:row-start-1 lg:col-start-2">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
            <h1 className="mt-1 text-3xl font-extrabold text-white">
              Cart Items
            </h1>

            <ul className="text-sm font-medium divide-y divide-white divide-opacity-10">
              {cartItems &&
                cartItems.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-start py-6 space-x-4"
                  >
                    <img
                      src={`/api/${product.imageURL}`}
                      alt={product.imageALT}
                      className="flex-none w-20 h-20 rounded-md object-center object-cover"
                    />
                    <div className="flex-auto space-y-1">
                      <h3 className="text-white">{product.name}</h3>
                    </div>

                    <dl className="flex-col items-start justify-between">
                      <div className="flex-none  text-base font-medium text-white space-y-1">
                        <div className="text-sm justify-between grid grid-cols-2 items-start text-white">
                          <dt>price</dt>
                          <dd className="text-base text-gray-900">
                            {product.price}
                          </dd>
                        </div>
                        <div className="text-sm justify-between grid grid-cols-2 items-start text-white">
                          <dt>Qty</dt>
                          <dd className="text-base  text-gray-900">
                            {product.quantity}
                          </dd>
                        </div>
                      </div>
                      <div className="text-sm  divide-y divide-white divide-opacity-70 justify-between grid grid-cols-2 items-start text-white">
                        <dt>Subtotal {"  "}</dt>
                        <dd className="text-base  text-gray-900">
                          {product.quantity * product.price}
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
            </ul>

            <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
              {/* <div className="flex items-center justify-between">
                <dt>Subtotal</dt>
                <dd>{subTotal}</dd>
              </div> */}

              <div className="flex items-center justify-between">
                <dt>Shipping</dt>
                <dd> free</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt>Taxes</dt>
                <dd> all prices is inclusive of Tax</dd>
              </div>

              <div className="flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">${subTotal}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="py-16  lg:max-w-lg lg:w-full lg:mx-auto lg:py-24 lg:pb-24 px-4 lg:row-start-1 lg:col-start-1">
          <form
            onSubmit={handleSubmit((formData) => {
              formData = {
                ...formData,
                cartItems: cartItems,
              };
              placeOrder.mutate(formData);
            })}
          >
            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
              <div>
                <h3
                  id="contact-info-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Contact information
                </h3>

                <div className="mt-6">
                  <label
                    htmlFor="receiverPhone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Receivers Phone number
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("receiverPhone")}
                      id="receiverPhone"
                      name="receiverPhone"
                      type="text"
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    />
                    {errors.receiverPhone && (
                      <Error message={errors.receiverPhone.message} />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3
                  id="payment-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Payment details
                </h3>

                <div className="col-span-3 mt-6 sm:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">
                    How do you prefer to pay?
                  </label>

                  <div className="mt-4 space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id}>
                        <div className="flex items-center">
                          <input
                            id={method.id}
                            name="paymentMethod"
                            {...register("paymentMethod")}
                            value={method.id}
                            type="radio"
                            defaultChecked={method.id === "cash"}
                            className="focus:ring-orange-500 h-4 w-4 text-orange-600 border-gray-300"
                          />
                          <label
                            htmlFor={method.id}
                            className="ml-3 block text-sm font-medium text-gray-700"
                          >
                            {method.title}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3
                  id="shipping-heading"
                  className="text-lg font-medium text-gray-900"
                >
                  Shipping Address
                </h3>

                <div className="mt-6">
                  <div className="mt-6">
                    <label
                      htmlFor="shippingAddress"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Delivery Address
                    </label>
                    <div className="mt-1">
                      <input
                        {...register("shippingAddress")}
                        id="shippingAddress"
                        name="shippingAddress"
                        type={"text"}
                        className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                      />
                      {errors.shippingAddress && (
                        <Error message={errors.shippingAddress.message} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  className="bg-orange-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-orange-500"
                >
                  order now
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
    </Layout>
  );
}
