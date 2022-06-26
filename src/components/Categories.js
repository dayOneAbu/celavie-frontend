import { Link } from "react-router-dom";
import useMeal from "../hooks/useMeal";

function Categories() {
  const { category } = useMeal();

  return (
    <div className="lg:flex  grid grid-cols-2 gap-2 max-w-7xl mb-10 mx-auto px-4 py-4 my-2 items-center justify-between">
      {category &&
        category.map((item) => (
          <Link
            to={`${item._id}`}
            key={item._id}
            className="flex flex-col items-center shadow-2xl p-1  rounded-2xl justify-between"
          >
            <img
              className="rounded w-36 h-36"
              src={`/api/${item.icon}`}
              alt={item.name}
            />
            <h1 className="text-lg font-bold flex-wrap text-gray-900 capitalize">
              {item.name}
            </h1>
          </Link>
        ))}
    </div>
  );
}
export default Categories;
