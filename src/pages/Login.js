import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { nopeResolver } from "@hookform/resolvers/nope";

import Nope from "nope-validator";
import { Layout, AppButton, WelcomeBoard, Error } from "../components";
import useAuth from "../hooks/useAuth";

const schema = Nope.object().shape({
  email: Nope.string().email().required(),
  password: Nope.string().required(),
});

function Login() {
  const { loginUser } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: nopeResolver(schema),
  });

  return (
    <Layout>
      <div className="flex flex-col justify-center min-h-full sm:px-6 lg:px-8">
        <WelcomeBoard title="log in to your account" />

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit((formData) => {
                loginUser.mutate(formData);
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
                    // type='email'
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
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
                    className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none form-input focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  />
                  {errors.password && (
                    <Error message={errors.password.message} />
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
                  className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-full shadow-sm"
                >
                  Log in
                </AppButton>
              </div>
            </form>

            <div className="mt-6">
              <div className="flex justify-center text-sm ">
                <h2 className="px-2 text-gray-500 capitalize bg-white">
                  or click here to
                </h2>
                <span className="text-sm">
                  <Link
                    to={"/register"}
                    className="font-medium text-orange-600 capitalize hover:text-orange-500"
                  >
                    register
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

export default Login;
