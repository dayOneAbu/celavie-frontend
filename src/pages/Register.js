import { useForm } from "react-hook-form";
import { nopeResolver } from "@hookform/resolvers/nope";
import { Link } from "react-router-dom";
import Nope from "nope-validator";
import { Layout, AppButton, WelcomeBoard, Error } from "../components";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const schema = Nope.object().shape({
  email: Nope.string().email().required(),
  password: Nope.string().required(),
  confirmPassword: Nope.string().required(),
});

function Register() {
  const { registerUser } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: nopeResolver(schema),
  });

  return (
    <Layout>
      <div className="min-h-full  flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <WelcomeBoard title="register and start ordering" />

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit((formData) => {
                if (formData.confirmPassword !== formData.password) {
                  toast.error("password does not match");
                } else {
                  registerUser.mutate(formData);
                  // registerCustomer.error && toast(registerCustomer.error.message);
                }
              })}
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    {...register("email")}
                    id="email"
                    name="email"
                    type="email"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                  {errors.email && <Error message={errors.email.message} />}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("password")}
                    id="password"
                    name="password"
                    type="password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                  {errors.password && (
                    <Error message={errors.password.message} />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  confirm Password
                </label>
                <div className="mt-1">
                  <input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    name="confirmPassword"
                    type="Password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />

                  {errors.confirmPassword && (
                    <Error message={errors.confirmPassword.message} />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="#"
                    className="font-medium text-orange-600 hover:text-orange-500"
                  >
                    reset password?
                  </Link>
                </div>
              </div>

              <div>
                <AppButton
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  register
                </AppButton>
              </div>
            </form>

            <div className="mt-6">
              <div className=" flex justify-center text-sm">
                <h2 className="px-2 bg-white text-gray-500 capitalize">
                  if you have account
                </h2>
                <span className="text-sm">
                  <Link
                    to={"/login"}
                    className="font-medium text-orange-600 capitalize hover:text-orange-500"
                  >
                    login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Register;
