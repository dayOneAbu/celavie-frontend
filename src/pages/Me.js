import { Layout } from "../components";
import useProfile from "../hooks/useProfile";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";
function Me() {
  const { profile, editProfile } = useProfile();
  if (!profile) {
    toast.error("you are not logged in");
    return <Navigate to="/login" replace={true} />;
  }
  return (
    <Layout>
      <div className="min-w-max">
        <div className=" md:max-w-6xl mx-auto">
          <div className="bg-white justify-center items-center flex-col flex  rounded-lg border mb-4 border-gray-200 shadow-md">
            <div className="flex items-center pb-10">
              <img
                src={`/api/${profile?.avatar}`}
                className="mb-3 w-24 h-24 rounded-full shadow-lg"
                alt=""
              />
            </div>
            <div className="flex items-center justify-between my-2 w-72">
              <button
                onClick={() => editProfile(profile)}
                className="w-full py-2 mx-4 border border-transparent shadow-sm text-sm font-medium text-white bg-orange-600 rounded-full"
              >
                edit profile
              </button>
              <button
                onClick={() => console.log("first")}
                className="w-full py-2 mx-4 border border-transparent shadow-sm text-sm font-medium text-white bg-red-800 rounded-full"
              >
                delete profile
              </button>
            </div>
          </div>
          <div className="bg-white py-8 px-4   shadow sm:rounded-lg sm:px-10">
            <div>
              <label
                htmlFor="fullName"
                className="block w-full text-sm font-medium text-gray-700"
              >
                Full Name
              </label>

              <div className="mt-1">
                <h3 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                  {profile?.fullName}
                </h3>
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
                <h3 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                  {profile?.address
                    ? profile.address
                    : "please insert your address"}
                </h3>
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
                <h3 className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                  {profile?.phone}
                </h3>
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
                <div className="overflow-hidden h-48 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
                  <img
                    src={`/api/${profile?.residentID}`}
                    className="block absolute h-48"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
export default Me;
