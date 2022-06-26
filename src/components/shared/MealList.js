import { Link } from "react-router-dom";
import Rating from "./Rating";

function MealList({ products }) {
  return (
    <div className="mt-4 mx-2">
      {products.map((product) => (
        <div
          key={product._id}
          className="shadow-xl border-2 border-orange-40 0 rounded-lg flex"
        >
          <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
            <img
              src={`/api/${product.image.imageURL}`}
              alt={product.image.imageALT}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="ml-4 mt-4 flex-1 flex flex-col">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3 className="text-red-500 font-semibold">
                  <Link to={`/menu/${product.slug}`}>{product.name}</Link>
                </h3>
                <p className="ml-4">{product.price}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col justify-between text-base font-medium text-gray-900">
                <h3>{product.preparationTime}</h3>
                <span className="flex items-center text-base justify-start">
                  <Rating selected={product.averageRating} />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default MealList;
