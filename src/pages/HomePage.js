import { Link } from "react-router-dom";
import { FaChevronCircleRight } from "react-icons/fa";
import { SocialShare, Layout, Trending } from "../components";
import Burger from "../asset/Buffalo Burger-PhotoRoom.png";
import { Categories } from "../components";
function HomePage() {
  return (
    <Layout>
      <div className="bg-gray-900 max-w-screen-2xl mx-auto lg:overflow-hidden">
        <div className="mx-auto max-w-7xl lg:px-8">
          <div className="lg:grid flex lg:grid-cols-3 lg:gap-2">
            <div className="mx-auto px-4 col-span-2 sm:max-w-xl sm:px-2 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
              <div className="lg:py-24 py-10">
                <Link
                  to="/menu"
                  className="md:inline-flex  items-center text-white  rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                >
                  <span className="px-3 py-0.5 text-white text-center text-xs font-semibold leading-5 uppercase tracking-wide bg-orange-500 rounded-full">
                    We're always open
                  </span>
                  <span className="ml-4 inline-flex text-center text-sm">
                    check out our MENU
                    <FaChevronCircleRight
                      className="w-5 h-5 mx-2 text-gray-500"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
                <h1 className="mt-4 text-4xl capitalize tracking-wider font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block">we make the best</span>
                  <span className="block mt-2 text-orange-500">
                    burger in Town
                  </span>
                </h1>
                <p className="mt-3 text-lg text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  We are one of the best{" "}
                  <span className="text-2xl capitalize">
                    burger house in town
                  </span>
                  , come visit us!
                </p>
              </div>
            </div>
            <div className="mt-4 sm:-mb-4 lg:m-0 col-span-1 lg:relative">
              <div className="mx-auto max-w-md right-0 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                <img
                  className="w-full scale-x-110 h-96 object-contain lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto md:object-cover lg:max-w-none"
                  src={Burger}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Trending />
      <div className="bg-orange-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Trusted and loved by many
            </h2>
            <p className="mt-3 text-xl text-indigo-200 sm:mt-4">
              we make the best foods and drinks come visit us and be your own
              wittiness
            </p>
          </div>
          <dl className="mt-10 text-center flex sm:mx-auto sm:grid sm:grid-cols-3 lg:gap-8">
            <div className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                fresh food
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                100%
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                Delivery
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                24/7
              </dd>
            </div>
            <div className="flex flex-col mt-10 sm:mt-0">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-indigo-200">
                open
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                24/7
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <Categories />
      <div className="bg-gray-900">
        <div className="flex  flex-col items-center justify-center lg:grid grid-cols-3 mx-auto max-w-7xl">
          <div className="col-span-1 px-6">
            <h2 className="mt-4 text-4xl capitalize tracking-wider font-extrabold text-red-500 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
              how to order food?
            </h2>
            <p className="mt-4 text-4xl capitalize tracking-wider font-extrabold text-orange-500 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
              check out this guide
            </p>
          </div>
          <div className="col-span-2 py-8 ">
            <iframe
              title="how to order"
              className="w-full aspect-video rounded-2xl"
              src="https://www.you tube.com/"
            />
          </div>
        </div>
      </div>
      <SocialShare />
    </Layout>
  );
}

export default HomePage;
