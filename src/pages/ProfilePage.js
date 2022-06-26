import { useForm } from "react-hook-form";
import Nope from "nope-validator";
import { Navigate } from "react-router-dom";
import { nopeResolver } from "@hookform/resolvers/nope";
import { Layout, AppButton, WelcomeBoard, Error } from "../components";
import useProfile from "../hooks/useProfile";
import { useEffect } from "react";

const schema = Nope.object().shape({
  fullName: Nope.string().atLeast(4).required(),
  address: Nope.string().atLeast(4).required(),
  phone: Nope.number().required(),
});

function ProfilePage() {
  const {
    createProfile,
    profile,
    setEditedProfile,
    updateProfile,
    editedProfile,
  } = useProfile();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    resolver: nopeResolver(schema),
  });
  useEffect(() => {
    if (editedProfile.isEditing === true) {
      setValue("phone", editedProfile.item.phone);
      setValue("address", editedProfile.item.address);
      setValue("fullName", editedProfile.item.fullName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedProfile.isEditing]);
  const onSubmitHandler = async (data) => {
    const formData = new FormData();
    formData.append("files", data.avatar[0]);
    formData.append("files", data.residentID[0]);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("fullName", data.fullName);
    if (editedProfile.isEditing === true) {
      updateProfile.mutate(formData);
      reset();
      setEditedProfile((prev) => {
        return { ...prev, isEditing: false };
      });
    } else createProfile.mutate(formData);
    reset();
  };
  if (profile && editedProfile.isEditing === false) {
    return <Navigate to="/profile/me" replace={true} />;
  }

  return (
    <Layout>
      <div className="min-h-full  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <WelcomeBoard title="create your profile here" />
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              encType="multipart/form-data"
              onSubmit={handleSubmit(onSubmitHandler)}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    {...register("fullName")}
                    id="fullName"
                    name="fullName"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.fullName && (
                    <Error message={errors.fullName.message} />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    {...register("address")}
                    id="address"
                    name="address"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.address && <Error message={errors.address.message} />}
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    {...register("phone")}
                    id="phone"
                    name="phone"
                    type="text"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 form-input focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.phone && <Error message={errors.phone.message} />}
                </div>
              </div>

              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                >
                  your photo
                </label>
                <div className="mt-1">
                  <input
                    {...register("avatar")}
                    id="avatar"
                    name="avatar"
                    type="file"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 form-input focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.avatar && <Error message={errors.avatar.message} />}
                </div>
              </div>

              <div>
                <label
                  htmlFor="residentID"
                  className="block text-sm font-medium text-gray-700"
                >
                  resident-ID
                </label>
                <div className="mt-1">
                  <input
                    {...register("residentID")}
                    id="residentID"
                    name="residentID"
                    type="file"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 form-input focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.residentID && (
                    <Error message={errors.residentID.message} />
                  )}
                </div>
              </div>

              <div>
                <AppButton
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-indigo-600 rounded-full"
                >
                  {editedProfile.isEditing === false
                    ? "create profile"
                    : "update profile"}
                </AppButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
