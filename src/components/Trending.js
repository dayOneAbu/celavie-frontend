import { Link } from "react-router-dom";
import combo from "../asset/25923fe280d540b3e05e8a98b822f8bf.jpg";
import useMeal from "../hooks/useMeal";
import AppButton from "./shared/AppButton";
import MealItem from "./shared/MealItem";

export default function Trending() {
  const { meals, isLoading } = useMeal();
  return (
    <div className="max-w-7xl mx-auto flex flex- md:grid grid-cols-4">
      <div className="col-span-2 lg:px-4 justify-center lg:items-center py-3">
        <img
          className="w-9/12 h-full rounded-2xl mx-auto object-fill"
          src={combo}
          alt=""
        />
      </div>
      <div className="col-span-2 max-w-sm items-start justify-between px-4 pt-2 lg:pt-24">
        <div className="my-2 py-2">
          <h1 className="text-3xl font-extrabold flex-wrap text-orange-500 tracking-wide uppercase">
            today's special <span className="mt-2">surprise for you</span>{" "}
          </h1>
        </div>
        <div className="my-2 ">
          <span className="text-lg font-bold text-gray-900 ">$ 199</span>
          <AppButton>Order Now</AppButton>
        </div>
      </div>
    </div>
  );
}
