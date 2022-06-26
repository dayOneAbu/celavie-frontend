import { useParams } from "react-router-dom";
import {
  Layout,
  Comments,
  CommentForm,
  Rating,
  AppButton,
} from "../components";
import { useQuery } from "react-query";
import api from "../utils/api";
import classNames from "classnames";
import { Fragment } from "react";
import { CheckCircleIcon, CurrencyDollarIcon } from "@heroicons/react/solid";
import { Tab } from "@headlessui/react";
import useCart from "../hooks/useCart";

function MealDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();
  const { data: meal, isFetching } = useQuery(`Detail for ${slug}`, () => {
    return api.get(`/meals/${slug}`).then((res) => res.data.message);
  });

  return (
    <Layout>
      {meal && (
        <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-rows-1 lg:grid-cols-7 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
            <div className="lg:row-end-1 lg:col-span-4">
              <div className="aspect-w-4 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden">
                <img
                  src={`/api/${meal.image.imageURL}`}
                  alt={meal.image.imageALT}
                  className="object-center object-cover"
                />
              </div>
            </div>

            <div className="max-w-2xl mx-auto mt-14 sm:mt-16 lg:max-w-none lg:mt-0 lg:row-end-2 lg:row-span-2 lg:col-span-3">
              <div className="flex flex-col">
                <div className="my-4">
                  <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                    {meal.name}
                  </h1>
                </div>
                <div className="mt-3">
                  <p className="text-3xl text-gray-900">{meal.price}</p>
                </div>
                <div>
                  <Rating selected={meal.averageRating} />
                </div>
              </div>

              <div className="mt-10 text-base text-gray-700 space-y-6  ">
                {meal.description}
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <AppButton
                  onClick={() => {
                    addToCart(
                      meal._id,
                      meal.name,
                      meal.slug,
                      meal.price,
                      meal.image.imageURL,
                      meal.image.imageALT
                    );
                  }}
                  type="button"
                  className="rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white"
                >
                  add to Cart
                </AppButton>
              </div>

              <div className="border-t border-gray-200 mt-10 pt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Ingredients
                </h3>
                <div className="my-4 prose prose-sm text-gray-500">
                  <ul>
                    {meal.ingredients.map((highlight) => (
                      <span
                        key={highlight}
                        className="flex my-2 items-center justify-start"
                      >
                        <CheckCircleIcon className="text-red-500 w-8 h-8" />
                        <li className="ml-2">{highlight}</li>
                      </span>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="w-full max-w-2xl mx-auto mt-16 lg:max-w-none lg:mt-0 lg:col-span-4">
              <CommentForm slug={slug} id={meal._id} />
              <Tab.Group as="div">
                <div className="border-b border-orange-400">
                  <Tab.List className="-mb-px flex space-x-8">
                    <Tab
                      className={({ selected }) =>
                        classNames(
                          selected
                            ? "border-orange-600 text-orange-600"
                            : "border-transparent text-gray-700 hover:text-gray-800 hover:border-gray-300",
                          "whitespace-nowrap py-6 border-b-2 font-medium text-sm"
                        )
                      }
                    >
                      Customer Reviews
                    </Tab>
                  </Tab.List>
                </div>
                <Tab.Panels as={Fragment}>
                  <Tab.Panel className="-mb-10">
                    {meal.comment.map((review, reviewIdx) => (
                      <Comments
                        isFetching={isFetching}
                        mealId={meal._id}
                        slug={meal.slug}
                        key={reviewIdx}
                        review={review}
                        index={reviewIdx}
                      />
                    ))}
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default MealDetailPage;
