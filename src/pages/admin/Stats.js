import DashboardStats from "../../components/DashboardStats";
import RecentTable from "../../components/RecentTable";
import { UserIcon } from "@heroicons/react/outline";
import { FaMoneyBillAlt, FaHamburger } from "react-icons/fa";
import useOrder from "../../hooks/useOrder";
import useProfile from "../../hooks/useProfile";

function Stats() {
  let data;
  const { orders, totalSells } = useOrder();
  const { customers } = useProfile();
  data = [
    { name: "Total Customers", icon: UserIcon, amount: customers?.length },
    {
      name: "Total Orders",
      icon: FaHamburger,
      amount: orders?.length,
    },
    {
      name: "Total Sells",
      icon: FaMoneyBillAlt,
      amount: totalSells,
    },
  ];

  return (
    <div className="mt-8 space-x-2">
      <DashboardStats stats={data} />
      <>
        {console.log()}
        <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
          Recent Orders
        </h2>
        <RecentTable data={orders} />
      </>
    </div>
  );
}
export default Stats;
