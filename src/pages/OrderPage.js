import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import api from "../utils/api";
import { AppButton, Layout } from "../components";
import PaymentRef from "../components/PaymentRef";
import useOrder from "../hooks/useOrder";
import { getStoredData } from "../utils/storageHelper";

export default function OrderPage() {
  const location = useLocation();
  const { cancelOrder } = useOrder();
  const id = getStoredData("orderID");
  const { data: order } = useQuery(
    `order summary for ${location.state ? location.state : id}`,
    () => {
      return api
        .get(`/orders/${location.state ? location.state : id}`)
        .then((res) => res.data.message);
    }
  );
  return (
    <Layout>
      {order ? (
        <div className="max-w-2xl mx-auto pt-16 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="px-4 space-y-2 sm:px-0 sm:flex flex-col sm:items-baseline sm:justify-between sm:space-y-0">
            <p className="my-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Thanks for ordering
            </p>
            <p className="mt-2 text-base text-gray-500">
              We appreciate your order, we’re currently processing it. hang
              tight and we’ll send you updates very soon!
            </p>
            <div className="flex sm:items-baseline sm:space-x-4">
              <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Your Order Number is: {order._id}
              </h1>
            </div>
          </div>

          <div className="mt-6">
            <div className="space-y-8 py-6 px-4  flex flex-col lg:grid lg:grid-cols-2  gap-x-8 p-8">
              {order.orderedItems.meals.map((item) => (
                <div
                  key={item._id}
                  className="bg-white border-t border-b border-gray-200 shadow-sm sm:border sm:rounded-lg"
                >
                  <div className="py-6 px-4">
                    <div className="grid grid-cols-5 justify-center">
                      <div className="flex-shrink-0 col-span-2 rounded-lg overflow-hidden sm:aspect-none h-28">
                        <img
                          src={`/api/${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>

                      <div className="mt-6 col-span-3 flex-1 sm:mt-0 sm:ml-6">
                        <h3 className="text-base font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          ${item.price}
                        </p>
                        <p className="mt-3 text-sm text-gray-500">
                          {item.quantity}
                        </p>
                        <p className="mt-3 text-sm text-gray-500">
                          {item.subTotal}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 py-6 px-4 sm:px-6 lg:p-8">
              <p className="text-sm font-medium text-gray-900">
                your order is
                <time dateTime={order.datetime}>{order.date}</time>
              </p>
              <div className="mt-6" aria-hidden="true">
                <div className="bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `calc((${order.orderStatus} * 2 + 1) / 8 * 100%)`,
                    }}
                  />
                </div>
                <div className="hidden sm:grid grid-cols-4 text-sm font-medium text-gray-600 mt-6">
                  <div className="text-orange-600"> pending</div>
                  <div
                    className={classNames(
                      order.orderStatus === "Accepted" ? "text-orange-600" : "",
                      "text-center"
                    )}
                  >
                    Accepted
                  </div>
                  <div
                    className={classNames(
                      order.orderStatus === "on-its-way"
                        ? "text-orange-600"
                        : "",
                      "text-center"
                    )}
                  >
                    on it's way
                  </div>
                  <div
                    className={classNames(
                      order.orderStatus === "delivered"
                        ? "text-orange-600"
                        : "",
                      "text-right"
                    )}
                  >
                    Delivered
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <div className="bg-gray-100 py-6 px-4 sm:px-6 sm:rounded-lg lg:px-8 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
              <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
                <div>
                  <dt className="font-medium text-gray-900">
                    Delivery address
                  </dt>
                  <dd className="mt-3 text-gray-500">
                    <span className="block">{order.shippingAddress}</span>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    Payment information
                  </dt>
                  <dd className="mt-3 text-gray-500">
                    <span className="block">{order.paymentStatus}</span>
                  </dd>
                  {order.paymentMethod === "online" ? <PaymentRef /> : null}
                </div>
              </dl>
              <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:col-span-5">
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd className="font-medium text-gray-900">free</dd>
                </div>
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Tax</dt>
                  <dd className="font-medium text-gray-900">
                    All prices are tax inclusive
                  </dd>
                </div>
                <div className="pb-4 flex items-center justify-between">
                  <dt className="font-medium text-gray-900">Order total</dt>
                  <dd className="font-medium text-orange-600">
                    $ {order.total}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="max-w-md items-center justify-center flex">
              <AppButton
                type="submit"
                className="flex mt-1 justify-center w-full px-2 py-2 text-sm font-medium text-white bg-orange-900 border border-transparent rounded-full shadow-sm"
                onClick={() => cancelOrder.mutate(order._id)}
              >
                cancel order
              </AppButton>
            </div>
          </div>
        </div>
      ) : (
        <OrderCanceled />
      )}
    </Layout>
  );
}

export function OrderCanceled() {
  return (
    <div className="px-4 space-y-2 sm:px-0 sm:flex flex-col sm:items-baseline sm:justify-between sm:space-y-0">
      <p className="my-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
        Your order is canceled Successfully
      </p>
      <p className="mt-2 text-base text-gray-500">
        We appreciate your comment, let us know what to improve.
      </p>
    </div>
  );
}
