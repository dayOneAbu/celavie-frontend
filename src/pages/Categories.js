import { useQuery } from "react-query";
import { useState } from "react";
import Banner from "../components/shared/Banner";
import api from "../utils/api";
import { useParams } from "react-router-dom";
import { Layout, MealItem } from "../components";
import MealList from "../components/shared/MealList";
function Categories() {
  const [category, setCategory] = useState();
  const { slug } = useParams();
  useQuery(
    `category detail for ${slug}`,
    () => {
      return api.get(`/category/${slug}`).then((res) => res.data.message);
    },
    {
      onSuccess: (data) => {
        setCategory(data);
      },
      onError: (data) => {
        console.log(data);
      },
      initialData: [],
      retry: 0,
    }
  );
  return (
    <Layout>
      <div className="max-w-7xl mx-auto ">
        {category && (
          <div className="bg-gray-900 rounded-xl my-4 p-2">
            <Banner
              className={"h-36 md:h-96"}
              imageLink={`/api/${category?.icon}`}
            />
            <h1 className="mt-4 text-4xl text-center uppercase tracking-wider font-extrabold text-white sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
              {category?.name}
            </h1>
          </div>
        )}
        <div className="flex flex-col gap-4 mx-auto md:hidden">
          {category?.meals && <MealList products={category.meals} />}
        </div>
        <div className="md:grid hidden grid-cols-1 md:grid-cols-4 gap-4">
          {category?.meals && <MealItem meals={category.meals} />}
        </div>
      </div>
    </Layout>
  );
}
export default Categories;
