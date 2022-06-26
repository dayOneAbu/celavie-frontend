import { Link, Outlet } from "react-router-dom";
import { AppButton } from "../../components";
import useProfile from "../../hooks/useProfile";

const headerLabel = [
  "avatar",
  "fullName",
  "email",
  "address",
  "phone",
  "recent orders",
];

function Customers() {
  const { customers } = useProfile();
  return (
    <>
      <div className="px-4 sm:px-2 lg:px-4">
        <div className="flex flex-col mt-2">
          <div className="align-middle max-w-7xl grid grid-cols-7 mx-auto min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full mx-auto col-span-5 divide-y divide-gray-200">
              <thead>
                <tr>
                  {headerLabel &&
                    headerLabel.map((item, idx) => (
                      <th
                        key={idx}
                        className="px-6 py-3  bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {item}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customers &&
                  customers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="bg-white max-w-7xl w-full"
                    >
                      <td className="max-w-0 whitespace-nowrap text-sm text-gray-900">
                        <div className="">
                          <img
                            src={`/api/${customer?.avatar}`}
                            className="mb-3 w-24 h-24 rounded-full shadow-lg"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className="max-w-0  px-6 py-4 w-full whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <p className="text-gray-600 truncate group-hover:text-gray-900">
                            {customer.fullName}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <span className="text-gray-900 font-medium">
                          {customer.email}
                        </span>
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        <span
                          className={
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                          }
                        >
                          {customer.address}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <span className="text-gray-900 font-medium">
                          {customer.phone}
                        </span>
                      </td>

                      <td className="overflow-hidden whitespace-nowrap text-sm text-gray-500">
                        <AppButton
                          className={"w-32 items-center justify-center h-10"}
                        >
                          <Link to={"recentOrder"}>show</Link>
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
export default Customers;
