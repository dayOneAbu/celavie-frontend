import Nope from "nope-validator";
import { useForm } from "react-hook-form";
import { nopeResolver } from "@hookform/resolvers/nope";
import { Error } from "../../components";
import useMeal from "../../hooks/useMeal";
import { useEffect } from "react";
import useAdmin from "../../hooks/useAdmin";

const schema = Nope.object().shape({
  name: Nope.string().required("please provide a name for the meal"),
  price: Nope.number().required("please provide a price for the meal"),
  preparationTime: Nope.string().required(
    "please provide average preparation Time for the meal"
  ),
  ingredients: Nope.string().required("please provide ingredient for the meal"),
  categorySlug: Nope.string().required(
    "please choose one category for the meal"
  ),
});
export default function AddMenu() {
  const { addMeal, category } = useMeal();
  const { editedItem, updateMeal, setEditedItem } = useAdmin();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: nopeResolver(schema),
  });
  useEffect(() => {
    if (editedItem.isEditing === true) {
      setValue("name", editedItem.item.name);
      setValue("price", editedItem.item.price);
      setValue("preparationTime", editedItem.item.preparationTime);
      setValue("ingredients", editedItem.item.ingredients);
      setValue("description", editedItem.item.description);
      setValue("categorySlug", editedItem.item.categorySlug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedItem.isEditing, editedItem.item]);

  const onSubmitHandler = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("preparationTime", data.preparationTime);
    formData.append("ingredients", data.ingredients);
    formData.append("description", data.description);
    formData.append("file", data.image[0]);
    formData.append("categorySlug", data.categorySlug);

    if (editedItem.isEditing === true) {
      updateMeal.mutate({ data: formData, id: editedItem.item._id });
      reset();
      setEditedItem((prev) => {
        return { ...prev, isEditing: false };
      });
    } else addMeal.mutate(formData);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className="space-y-8 divide-y mx-auto px-4 py-4 max-w-4xl border shadow-lg"
    >
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Add new Meal to the Menu
            </h3>
            <p className="mt-1 max-w-2xl  text-sm text-gray-500">
              This information will be displayed publicly in the Menu
            </p>
          </div>

          <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Meal Name
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="mt-1">
                  <input
                    {...register("name")}
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
                {errors.name && <Error message={errors.name.message} />}
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Price
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="mt-1">
                  <input
                    {...register("price")}
                    id="price"
                    name="price"
                    type="text"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
                {errors.price && <Error message={errors.price.message} />}
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="preparationTime"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Average preparation Time
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="mt-1">
                  <input
                    {...register("preparationTime")}
                    id="preparationTime"
                    name="preparationTime"
                    type="text"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
                {errors.preparationTime && (
                  <Error message={errors.preparationTime.message} />
                )}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="ingredients"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Ingredients used to prepare the food
                <span className="text-base text-red-600 block">
                  use comma (",") for every entry{" "}
                </span>
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="mt-1">
                  <input
                    {...register("ingredients")}
                    id="ingredients"
                    name="ingredients"
                    type="text"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
                {errors.ingredients && (
                  <Error message={errors.ingredients.message} />
                )}
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                write the description of the food
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="mt-1">
                  <textarea
                    {...register("description")}
                    id="description"
                    name="description"
                    type="text"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
                {errors.description && (
                  <Error message={errors.description.message} />
                )}
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Cover photo
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="mt-1">
                  <input
                    {...register("image")}
                    id="image"
                    name="image"
                    type="file"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 form-input focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                </div>
                {errors.image && <Error message={errors.image.message} />}
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                choose category
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <select
                  {...register("categorySlug")}
                  id="categorySlug"
                  name="categorySlug"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
                  defaultValue={
                    editedItem.isEditing === true
                      ? editedItem.item.categorySlug
                      : category && category[0]?.name
                  }
                >
                  {category &&
                    category.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  {/* <option>burger</option>
                  <option>break fast</option> */}
                </select>
              </div>
              {errors.categorySlug && (
                <Error message={errors.categorySlug.message} />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
