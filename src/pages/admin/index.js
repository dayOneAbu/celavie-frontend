import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { nopeResolver } from "@hookform/resolvers/nope";

import Nope from "nope-validator";
import useAdmin from "../../hooks/useAdmin";
import { Error, Layout, AppButton, WelcomeBoard } from "../../components";

const schema = Nope.object().shape({
  email: Nope.string().email().required("please provide valid email address"),
  password: Nope.string().required("please provide a password"),
});

function AdminLogin() {
  const { adminLogin } = useAdmin();

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
                adminLogin.mutate(formData);
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
                    forget password?
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
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdminLogin;
