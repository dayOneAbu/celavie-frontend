import classNames from "classnames";
import Rating from "./Rating";
import { MdOutlineDeleteForever, MdModeEditOutline } from "react-icons/md";
import useProfile from "../../hooks/useProfile";
import useMeal from "../../hooks/useMeal";
import { useEffect } from "react";

function Comments({ review, isFetching, mealId, slug, index }) {
  const { profile } = useProfile();
  const { deleteComment, editComment } = useMeal();

  useEffect(() => {}, [isFetching]);

  const isUser = profile?._id === review.customer?._id ? true : false;

  return (
    <div key={review._id} className="flex text-sm text-gray-500 space-x-4">
      <div className="flex-none py-10">
        <img
          src={`/api/${review.customer.avatar}`}
          alt=""
          className="w-10 h-10 bg-gray-100 rounded-full"
        />
      </div>
      <div
        className={classNames(
          index === 0 ? "" : "border-t border-gray-200",
          "py-10"
        )}
      >
        <div className="ml-4 flex-shrink-0 flex">
          <span>
            <h3 className="font-medium text-gray-900">
              {review.customer.fullName}
            </h3>
            <p>{review.customer.updatedAt}</p>
          </span>
          {isUser && (
            <span className="flex flex-shrink-0 mx-10">
              <MdModeEditOutline
                className="h-5 w-5"
                onClick={() => editComment(review)}
              />
              <MdOutlineDeleteForever
                className="h-5 w-5"
                onClick={() =>
                  deleteComment.mutate({ id: mealId, comId: review._id, slug })
                }
              />
            </span>
          )}
        </div>

        <Rating selected={review.rating} />

        <p className="mt-4 prose prose-sm max-w-none text-gray-500">
          {review.feedback}
        </p>
      </div>
    </div>
  );
}
export default Comments;
