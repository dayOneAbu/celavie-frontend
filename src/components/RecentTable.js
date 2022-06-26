import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import AppButton from "./shared/AppButton";
import { useEffect, useState } from "react";
import useOrder from "../hooks/useOrder";

const statusStyles = {
  Pending: "bg-green-100 text-green-800",
  accepted: "bg-green-300 text-green-800",
  processing: "bg-yellow-100 text-yellow-800",
  onTheWay: "bg-gray-100 text-gray-800",
  delivered: "bg-gray-100 text-gray-800",
};
const inputs = {
  headerLabel: [
    "No.",
    "Customer Name",
    "Order Status",
    "total",
    "delivery Address",
    "payment Method",
    "show detail",
  ],
};

function RecentTable({ data }) {
  const [status, setStatus] = useState({
    id: null,
    orderStatus: "pending",
  });
  const { updateOrder } = useOrder();
  const location = useLocation();
  useEffect(() => {
    updateStatus(status);
  }, [status]);
  function onchangeHandler(e, id) {
    setStatus((prev) => {
      return { ...prev, id: id, orderStatus: e.target.value };
    });
  }
  function updateStatus({ id, orderStatus }) {
    const formData = {
      orderStatus: orderStatus,
    };
    updateOrder.mutate({ id, formData });
  }
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-2 lg:px-4">
        <div className="flex flex-col mt-2">
          <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className=" bg-orange-500">
                <tr>
                  {inputs &&
                    inputs.headerLabel.map((item, idx) => (
                      <th
                        key={idx}
                        className="px-6 py-3  text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        {item}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, idx) => (
                  <tr
                    key={item._id}
                    className="hover:bg-orange-400 hover:text-white h-20 shadow-xl bg-opacity-90 rounded-xl text-sm font-medium uppercase cursor-pointer"
                  >
                    <td className="max-w-0 px-6  py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex">
                        <p className="text-gray-500 truncate ">{idx + 1}</p>
                      </div>
                    </td>
                    <td className=" w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex">
                        <p className="text-gray-600 truncate group-hover:text-gray-900">
                          {item.customer.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-6 flex flex-col items-center justify-between py-4 whitespace-nowrap text-sm text-gray-500 ">
                      <span
                        className={classNames(
                          statusStyles[item.status],
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                        )}
                      >
                        {item.orderStatus}
                      </span>
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:pt-5">
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                          <select
                            id="status"
                            name="status"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                            defaultValue={status}
                            onChange={(event) =>
                              onchangeHandler(event, item._id)
                            }
                          >
                            <option>Pending</option>
                            <option>Accepted</option>
                            <option>on-its-way</option>
                            <option>delivered</option>
                          </select>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                      <span className="text-gray-900 font-medium">
                        {item.total}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                      <span className="text-gray-900 font-medium">
                        {item.shippingAddress}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                      <span className="text-gray-900 font-medium">
                        {item.paymentMethod}
                      </span>
                    </td>

                    <td className="overflow-hidden whitespace-nowrap text-sm text-gray-500">
                      <AppButton
                        className={"w-32 items-center justify-center h-10"}
                      >
                        <Link
                          to={
                            location.pathname === "/admin/dashboard/home"
                              ? `/admin/dashboard/orders/${item._id}`
                              : item._id
                          }
                        >
                          show
                        </Link>
                      </AppButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default RecentTable;
