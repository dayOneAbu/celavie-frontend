import Nope from "nope-validator";
import { useForm } from "react-hook-form";
import { nopeResolver } from "@hookform/resolvers/nope";
import { MdOutlineDeleteForever, MdModeEditOutline } from "react-icons/md";
import { AppButton, Error } from "../../components";
import useAdmin from "../../hooks/useAdmin";
import { useEffect } from "react";
import useMeal from "../../hooks/useMeal";
const schema = Nope.object().shape({
  name: Nope.string().required("please provide the name for New Category"),
});

function CategoryEditor() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    resolver: nopeResolver(schema),
  });

  const { createCategory, setEditedItem, updateCategory, editedItem } =
    useAdmin();
  const { category } = useMeal();
  useEffect(() => {
    if (editedItem.isEditing === true) {
      setValue("name", editedItem.item.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedItem.isEditing, editedItem.item]);

  const onSubmitHandler = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("icon", data.icon[0]);
    // createCategory.mutate(formData);
    // reset();
    if (editedItem.isEditing === true) {
      updateCategory.mutate({ data: formData, id: editedItem.item._id });
      reset();
      setEditedItem((prev) => {
        return { ...prev, isEditing: false };
      });
    } else createCategory.mutate(formData);
    reset();
  };
  return (
    <div>
      <div className="flex flex-col justify-center min-h-full sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit(onSubmitHandler)}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1">
                  <input
                    {...register("name")}
                    id="name"
                    name="name"
                    type="text"
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.name && <Error message={errors.name.message} />}
                </div>
              </div>

              <div>
                <label
                  htmlFor="icon"
                  className="block text-sm font-medium text-gray-700"
                >
                  icon
                </label>
                <div className="mt-1">
                  <input
                    {...register("icon")}
                    id="icon"
                    name="icon"
                    type="file"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 form-input focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.icon && <Error message={errors.icon.message} />}
                </div>
              </div>

              <AppButton
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-full shadow-sm"
              >
                Save
              </AppButton>
            </form>
          </div>
        </div>
      </div>
      <Categories isAdmin={true} category={category} />
    </div>
  );
}
export default CategoryEditor;

const Categories = ({ isAdmin, category }) => {
  const { edit, deleteCategory } = useAdmin();
  return (
    <div className=" grid-flow-row grid grid-cols-3 md:grid-cols-7  gap-2 max-w-7xl mb-10 mx-auto  py-4 my-2 items-center justify-between">
      {category &&
        category.map((item) => (
          <span
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
            {isAdmin && (
              <span className="flex flex-shrink-0 mx-10">
                <MdModeEditOutline
                  className="h-12 w-12 text-gray-900"
                  onClick={() => edit(item)}
                />
                <MdOutlineDeleteForever
                  className="h-12 w-12 text-red-500"
                  onClick={() => deleteCategory.mutate(item._id)}
                />
              </span>
            )}
          </span>
        ))}
    </div>
  );
};
