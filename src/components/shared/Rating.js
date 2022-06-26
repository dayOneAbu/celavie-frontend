import { StarIcon } from "@heroicons/react/solid";
import classNames from "classnames";

function Rating({ selected, onChange }) {
  return (
    <div className="flex items-center mt-4">
      {[0, 1, 2, 3, 4].map((rating, idx) => (
        <StarIcon
          onClick={() => onChange(idx + 1)}
          key={rating}
          className={classNames(
            selected > rating ? "text-yellow-400" : "text-gray-300",
            "h-5 w-5 flex-shrink-0"
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
export default Rating;
