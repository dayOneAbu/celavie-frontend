import { Error, Layout } from "../components";
import { LocationMarkerIcon, PhoneIcon } from "@heroicons/react/outline";
import one from "../asset/1.jpg";
import two from "../asset/5.jpg";
import three from "../asset/3.jpg";
import four from "../asset/4.jpg";
import { useForm } from "react-hook-form";
import { nopeResolver } from "@hookform/resolvers/nope";
import Nope from "nope-validator";
import { useMutation } from "react-query";
import { toast } from "react-hot-toast";
import api from "../utils/api";
const features = [
  {
    name: "birthday specials",
    description:
      "if you want a memorable birthday gift for your loved ones we got you cover ",
  },
  {
    name: "catering",
    description:
      "Solid walnut base with rare earth magnets and powder coated steel card cover",
  },
  {
    name: "special events",
    description:
      "come and celebrate your special moment we promise to make it a lot special ",
  },
  {
    name: "wedding",
    description: "we prepare custom-designed cakes to suit any occasion",
  },
];
const schema = Nope.object().shape({
  name: Nope.string().required("please provide your Name"),
  email: Nope.string().email().required("please Provide your email"),
  message: Nope.string().required("please Provide your message"),
  phone: Nope.string().required("please Provide your phone Number"),
});
function HirePage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: nopeResolver(schema),
  });
  const sendMessage = useMutation(
    (formData) => api.post("/messages/new", formData).then((res) => res.data),
    {
      onSuccess: (data) => {
        toast.success("your message is sent successfully");
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  return (
    <Layout>
      <div className="relative mx-2 max-w-7xl lg:mx-auto">
        <div className="max-w-2xl mx-auto py-4 px-4 grid items-center grid-cols-1 gap-y-10 gap-x-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
          <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
            <img
              src={one}
              alt=""
              className="bg-gray-100 h-60 object-contain w-full rounded-lg"
            />
            <img
              src={two}
              alt=""
              className="bg-gray-100 h-60 object-contain w-full rounded-lg"
            />
            <img
              src={three}
              alt=""
              className="bg-gray-100 h-60 object-contain w-full rounded-lg"
            />
            <img
              src={four}
              alt=""
              className="bg-gray-100 h-60 object-contain w-full rounded-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Service we provide
            </h2>

            <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
              {features.map((feature) => (
                <div
                  key={feature.name}
                  className="border-t border-gray-200 pt-4"
                >
                  <dt className="font-medium text-gray-900">{feature.name}</dt>
                  <dd className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div>
          <div className="relative sm:px-6 lg:px-8 rounded-md  py-8 px-4">
            <div className="relative rounded-md shadow-xl lg:grid lg:grid-cols-3">
              <div className="h-full py-8 px-8 mx-auto bg-gray-900 col-span-1">
                <h2 className="text-2xl uppercase font-extrabold text-white tracking-tight">
                  Let's work together
                </h2>
                <p className="mt-6 my-4 text-xl  text-indigo-50 max-w-3xl sm:mt-3">
                  we would love to work for you! send us a message and we will
                  contact you
                </p>

                <h3 className="text-lg my-4 font-medium text-white">
                  Contact information
                </h3>
                <dl className="mt-8 space-y-6">
                  <dt>
                    <span className="sr-only">Phone number</span>
                  </dt>

                  <dd className="flex text-xl mt-4 text-indigo-50">
                    <PhoneIcon
                      className="flex-shrink-0 w-8 h-8 text-indigo-200"
                      aria-hidden="true"
                    />
                    <span className="ml-3">7877</span>
                  </dd>
                  <dd className="flex text-xl mt-4 text-indigo-50">
                    <PhoneIcon
                      className="flex-shrink-0 w-8 h-8 text-indigo-200"
                      aria-hidden="true"
                    />
                    <span className="ml-3">0939873617</span>
                  </dd>
                </dl>
                <div className="my-4">
                  <h2 className="text-xl uppercase font-extrabold text-white">
                    Our office
                  </h2>
                  <div>
                    <p className=" text-xl mt-4 text-indigo-50">
                      <span className="mt-2 inline-flex">
                        <LocationMarkerIcon
                          className="flex-shrink-0 w-8 h-8 text-indigo-200"
                          aria-hidden="true"
                        />
                        <span className="mx-4">
                          Addis Ababa, Bole In front of Brass Hospital
                        </span>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="lg:pl-8 bg-white col-span-2">
                <div className="max-w-md mx-auto sm:max-w-lg lg:mx-0">
                  <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
                    <h3 className="text-lg font-medium text-warm-gray-900">
                      Send us a message
                    </h3>
                    <form
                      onSubmit={handleSubmit((formData) => {
                        sendMessage.mutate(formData);
                        reset();
                      })}
                      className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
                    >
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-warm-gray-900"
                        >
                          Name
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="name"
                            {...register("name")}
                            id="name"
                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-orange-500 focus:border-orange-500 border border-warm-gray-300 rounded-md"
                          />
                          {errors.name && (
                            <Error message={errors.name.message} />
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-warm-gray-900"
                        >
                          Email
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            {...register("email")}
                            name="email"
                            type="email"
                            autoComplete="email"
                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-orange-500 focus:border-orange-500 border border-warm-gray-300 rounded-md"
                          />
                          {errors.email && (
                            <Error message={errors.email.message} />
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="flex justify-between">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-warm-gray-900"
                          >
                            Phone
                          </label>
                        </div>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="phone"
                            {...register("phone")}
                            id="phone"
                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-orange-500 focus:border-orange-500 border border-warm-gray-300 rounded-md"
                          />
                          {errors.phone && (
                            <Error message={errors.phone.message} />
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <div className="flex justify-between">
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-warm-gray-900"
                          >
                            Message
                          </label>
                        </div>
                        <div className="mt-1">
                          <textarea
                            id="message"
                            name="message"
                            {...register("message")}
                            rows={4}
                            className="py-3 px-4 block w-full shadow-sm text-warm-gray-900 focus:ring-orange-500 focus:border-orange-500 border border-warm-gray-300 rounded-md"
                            defaultValue={""}
                          />
                          {errors.message && (
                            <Error message={errors.message.message} />
                          )}
                        </div>
                      </div>
                      <div className="sm:col-span-2 sm:flex sm:justify-end">
                        <button
                          type="submit"
                          className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:w-auto"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default HirePage;
