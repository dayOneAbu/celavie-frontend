import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import api from "../../utils/api";

export default function OrdersDetail() {
  const { id } = useParams();
  const { data: order } = useQuery(`orderDetail for ${id}`, () => {
    return api.get(`/orders/${id}`).then((res) => res.data.message);
  });

  return (
    <div className="bg-white px-2 rounded-lg">
      <div className="max-w-7xl mx-auto py-4">
        <div className="max-w-xl">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Order Detail
          </h1>
        </div>

        {order && (
          <div className="mt-16">
            <div className="space-y-20">
              <div className="">
                <div className="flex flex-col items-center pb-10">
                  <img
                    src={`/api/${order.customer?.avatar}`}
                    className="mb-3 w-24 h-24 rounded-full shadow-lg"
                    alt=""
                  />
                </div>

                <div className="bg-white px-4 py-4 my-4 shadow rounded-lg">
                  <dl className="divide-gray-200 text-sm text-gray-600 flex-col gap-x-6 flex-auto ">
                    <div className="flex  justify-between">
                      <dt className="font-medium text-gray-900"> Full Name</dt>
                      <dd className="sm:mt-1">{order.customer.name}</dd>
                    </div>
                    <div className="flex  justify-between">
                      <dt className="font-medium text-gray-900">customer ID</dt>
                      <dd className="sm:mt-1">{order.customer.customerId}</dd>
                    </div>
                    <div className="flex  justify-between">
                      <dt className="font-medium text-gray-900">
                        Phone Number
                      </dt>
                      <dd className="sm:mt-1">{order.customer.phone}</dd>
                    </div>
                  </dl>
                </div>
                <div className="bg-white my-4 shadow  rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8">
                  <dl className="divide-gray-200 text-sm text-gray-600 flex-col gap-x-6 flex-auto ">
                    <div className="flex  justify-between">
                      <dt className="font-medium text-gray-900">Date placed</dt>
                      <dd className="">
                        <time
                        // dateTime={order.datetime}
                        >
                          {order.createdAt}
                        </time>
                      </dd>
                    </div>
                    <div className="flex  justify-between">
                      <dt className="font-medium text-gray-900">
                        Date updated
                      </dt>
                      <dd className="">
                        <time
                        //  dateTime={order.datetime}
                        >
                          {order.updatedAt}
                        </time>
                      </dd>
                    </div>
                    <div className="flex  justify-between">
                      <dt className="font-medium text-gray-900">
                        Order number
                      </dt>
                      <dd className="sm:mt-1 bg-orange-500 text-white px-2 ">
                        {order._id}
                      </dd>
                    </div>
                    <div className="flex  justify-between">
                      <dt className="font-medium text-gray-900">Total price</dt>
                      <dd className="sm:mt-1">{order.total}</dd>
                    </div>
                    <div className="flex  justify-between">
                      <dt className="font-medium text-gray-900">
                        Payment Method
                      </dt>
                      <dd className="sm:mt-1">{order.paymentMethod}</dd>
                    </div>
                    <div className="flex  justify-between">
                      <dt className="font-medium text-gray-900">
                        Payment Status
                      </dt>
                      <dd className="sm:mt-1">{order.paymentStatus}</dd>
                    </div>
                    <div className="flex  justify-between">
                      <dt className="font-medium text-gray-900">
                        Order Receiver Phone
                      </dt>
                      <dd className="sm:mt-1">{order.receiverPhone}</dd>
                    </div>
                    <div className="flex  justify-between">
                      <dt className="font-medium text-gray-900">
                        Shipping Address
                      </dt>
                      <dd className="sm:mt-1">{order.shippingAddress}</dd>
                    </div>
                  </dl>
                </div>
                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                  <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                    <tr>
                      <th
                        scope="col"
                        className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal"
                      >
                        Meal Name
                      </th>
                      <th
                        scope="col"
                        className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell"
                      >
                        Qty
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-gray-200 divide-y divide-gray-200 text-sm border-t">
                    {order.orderedItems.meals.map((item) => (
                      <tr key={item.id}>
                        <td className="py-6 pr-8">
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden py-6 pr-8 sm:table-cell">
                          {item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
