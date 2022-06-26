import { ShoppingBagIcon } from "@heroicons/react/outline";
import useCart from "../../hooks/useCart";
import CartModal from "./CartModal";
function NavCart() {
  const { setIsCartOpen, totalItems } = useCart();
  return (
    <div className="ml-4 flow-root lg:ml-6">
      <button
        onClick={() => setIsCartOpen((isCartOpen) => !isCartOpen)}
        className="group -m-2 p-2 flex items-center"
      >
        <ShoppingBagIcon
          className="flex-shrink-0 h-6 w-6 text-gray-50 group-hover:text-gray-200"
          aria-hidden="true"
        />
        <span className="ml-2 text-base font-medium text-white group-hover:text-white">
          {totalItems}
        </span>
      </button>
      <CartModal />
    </div>
  );
}
export default NavCart;
