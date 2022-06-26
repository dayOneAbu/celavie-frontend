import { Outlet } from "react-router-dom";
import RecentTable from "../../components/RecentTable";
import useOrder from "../../hooks/useOrder";
function Orders() {
  const { orders } = useOrder();
  return (
    <div className="grid grid-cols-7">
      <div className="col-span-5">
        <RecentTable data={orders} />
      </div>
      <div className="col-span-2">
        <Outlet />
      </div>
    </div>
  );
}
export default Orders;
