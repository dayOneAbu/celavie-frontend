import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";
import Rating from "./Rating";

export default function MealItem({ meals }) {
  const { addToCart } = useCart();
  return (
    <>
      {meals &&
        meals.map((meal) => (
          <div
            key={meal._id}
            className="max-w-sm relative rounded-lg shadow-md py-2 bg-slate-100"
          >
            <Badge text={"available 2-4"} />
            <Link to={`/menu/${meal.slug}`}>
              <img
                src={`/api/${meal.image.imageURL}`}
                alt={meal.image.imageALT}
                className="rounded-t-lg h-48 w-full"
              />
            </Link>
            <div className="px-5 pb-2">
              <Link to={`/menu/${meal.slug}`}>
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 ">
                  {meal.name}
                </h5>
              </Link>
              <div className="flex items-center mt-2.5 mb-2">
                <Rating selected={meal.averageRating} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900 ">
                  $ {meal.price}
                </span>
                <button
                  onClick={() => {
                    addToCart(
                      meal._id,
                      meal.name,
                      meal.slug,
                      meal.price,
                      meal.image.imageURL,
                      meal.image.imageALT
                    );
                  }}
                  type="button"
                  className="px-6 py-2 transition ease-in duration-200 bg-yellow-500 uppercase rounded-full hover:bg-red-800 hover:text-white border-2 border-gray-900 focus:outline-none"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export function Badge({ text }) {
  return (
    <>
      <span className="inline-flex absolute top-2 items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
        <svg
          className="mr-1.5 h-2 w-2 text-orange-400"
          fill="currentColor"
          viewBox="0 0 8 8"
        >
          <circle cx={4} cy={4} r={3} />
        </svg>
        {text}
      </span>
    </>
  );
}
