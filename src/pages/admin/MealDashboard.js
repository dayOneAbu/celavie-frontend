import { Rating } from "../../components";
import useMeal from "../../hooks/useMeal";
import { MdOutlineDeleteForever, MdModeEditOutline } from "react-icons/md";
import useAdmin from "../../hooks/useAdmin";
const headerLabel = [
  "No.",
  "cover picture",
  "Meal Name",
  "Meal price",
  "Average Rating",
  "ingredients",
  "preparation Time",
  "Action",
];

function MealDashboard() {
  const { meals } = useMeal();
  const { edit, deleteMeal } = useAdmin();
  return (
    <>
      <div className="px-4 sm:px-2 lg:px-4">
        <div className="flex flex-col mt-2">
          <div className="align-middle max-w-7xl grid grid-cols-6 mx-auto min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full col-span-6 mx-auto divide-y divide-gray-200">
              <thead>
                <tr>
                  {headerLabel &&
                    headerLabel.map((item, idx) => (
                      <th
                        key={idx}
                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {item}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {meals &&
                  meals.map((meal, idx) => (
                    <tr key={meal._id} className="bg-white max-w-7xl w-full">
                      <td className="max-w-0 w-6 items-center justify-center text-sm text-gray-900">
                        <span className="flex text-lg items-center justify-center text-gray-700 text-center ">
                          {idx + 1}
                        </span>
                      </td>
                      <td className="max-w-0 items-center justify-center whitespace-nowrap text-sm text-gray-900">
                        <span>
                          <img
                            src={`/api/${meal.image.imageURL}`}
                            alt={""}
                            className="mb-3 w-24 h-24 rounded-md shadow-lg"
                          />
                        </span>
                      </td>
                      <td className="max-w-0  px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="flex">
                          <p className="text-gray-600 truncate group-hover:text-gray-900">
                            {meal.name}
                          </p>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <span className="text-gray-900 font-medium">
                          {meal.price}
                        </span>
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        <span
                          className={
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                          }
                        >
                          <Rating selected={meal.averageRating} />
                        </span>
                      </td>

                      <td className="overflow-hidden  whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                          }
                        >
                          {meal.ingredients}
                        </span>
                      </td>
                      <td className="overflow-hidden whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                          }
                        >
                          {meal.preparationTime}
                        </span>
                      </td>
                      <td className="overflow-hidden whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={
                            "inline-flex border-orange-600 border-r-4 items-center px-2.5 py-0.5  text-xs font-medium capitalize"
                          }
                        >
                          <MdModeEditOutline
                            className="h-8 w-8 text-gray-900"
                            onClick={() =>
                              edit(meal, "/admin/dashboard/menuEditor/new")
                            }
                          />
                        </span>
                        <span
                          className={
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                          }
                        >
                          <MdOutlineDeleteForever
                            className="h-8 w-8 text-red-500"
                            onClick={() => deleteMeal.mutate(meal._id)}
                          />
                        </span>
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

export default MealDashboard;
