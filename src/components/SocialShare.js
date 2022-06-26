import pizza from "../asset/pizza.jpg";
import burger from "../asset/burger.jpg";
import burger2 from "../asset/burger2.jpg";
import burger3 from "../asset/burger3.jpg";
import burger4 from "../asset/download.png";

export default function SocialShare() {
  return (
    <div className="my-4 py-4">
      <h2 className="mx-4 text-gray-900 py-6 lg:py-24  font-bold text-2xl px-4 capitalize text-center">
        our beloved customers shared this on facebook
      </h2>
      <div className="grid grid-flow-col grid-rows-2 max-w-7xl max-h-min mx-auto grid-cols-3 gap-8">
        <div>
          <img src={burger} alt="" loading="lazy" />
        </div>
        <div className="col-start-3">
          <img src={burger2} alt="" loading="lazy" />
        </div>
        <div>
          <img src={burger3} alt="" loading="lazy" />
        </div>
        <div>
          <img src={burger4} alt="" loading="lazy" />
        </div>
        <div className="row-start-1 col-start-2 col-span-2">
          <img src={pizza} alt="" loading="lazy" />
        </div>
      </div>
    </div>
  );
}
