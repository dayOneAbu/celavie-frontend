import { Link } from "react-router-dom";
import { MdAdd, MdRemove } from "react-icons/md";
import useCart from "../../hooks/useCart";
function CartItems({ products }) {
  const { removeFromCart, setIsCartOpen, addToCart } = useCart();
  return (
    <div className="mt-8 ">
      <div className="flow-root">
        <ul className="-my-6 divide-y divide-gray-200">
          {products.map((product) => (
            <li key={product.id} className="py-6 flex">
              <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                <img
                  src={`/api/${product.imageURL}`}
                  alt={product.imageALT}
                  className="w-full h-full object-center object-cover"
                />
              </div>

              <div className="ml-4 flex-1 flex flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <Link
                        to={`/menu/${product.slug}`}
                        onClick={() =>
                          setIsCartOpen((isCartOpen) => !isCartOpen)
                        }
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <p className="ml-4">{product.price}</p>
                  </div>
                </div>
                <div className="flex-1 flex items-end justify-between text-sm">
                  <p className="text-gray-500">Qty {product.quantity}</p>
                  <div className="flex">
                    <MdRemove
                      className="h-8 w-8 text-orange-500"
                      onClick={() => removeFromCart(product.id)}
                    />
                    <MdAdd
                      className="h-8 w-8 text-orange-500"
                      onClick={() => {
                        addToCart(product.id);
                      }}
                    />
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default CartItems;
