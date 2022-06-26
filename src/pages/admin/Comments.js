import { useQuery } from "react-query";
import { Rating } from "../../components";

import api from "../../utils/api";
const headerLabel = [
  "profile picture",
  "full Name",
  "feedback",
  "rating",
  "Meal Name",
  "Meal price",
];
function Comments() {
  const { data: comments, isFetching } = useQuery("comments", () => {
    return api.get(`/manager/comments`).then((res) => res.data.message);
  });
  if (isFetching) {
    return <h1>loading</h1>;
  }

  return (
    <>
      <div className="px-4 sm:px-2 lg:px-4">
        <div className="flex flex-col mt-2">
          <div className="align-middle max-w-7xl grid grid-cols-6 mx-auto min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full col-span-6 mx-auto divide-y divide-gray-200">
              <thead>
                <tr>
                  {headerLabel &&
                    headerLabel.map((item, idx) => (
                      <th
                        key={idx}
                        className="px-6 py-3  bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {item}
                      </th>
                    ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {comments &&
                  comments.map((comment) => (
                    <tr key={comment._id} className="bg-white max-w-7xl w-full">
                      <td className="max-w-0 items-center justify-center whitespace-nowrap text-sm text-gray-900">
                        <div>
                          <img
                            src={`/api/${comment.customer.avatar}`}
                            alt={""}
                            className="mb-3 w-24 h-24 rounded-md shadow-lg"
                          />
                        </div>
                      </td>
                      <td className="max-w-0  px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <p className="text-gray-600 truncate group-hover:text-gray-900">
                            {comment.customer.fullName}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <span className="text-gray-900 font-medium">
                          {comment.feedback}
                        </span>
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        <span
                          className={
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                          }
                        >
                          <Rating selected={comment.rating} />
                        </span>
                      </td>
                      <td className="overflow-hidden whitespace-nowrap text-sm text-gray-500">
                        <div className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                          <span
                            className={
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                            }
                          >
                            {comment.mealId?.name}
                          </span>
                        </div>
                      </td>

                      <td className="overflow-hidden whitespace-nowrap text-sm text-gray-500">
                        <div className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                          <span
                            className={
                              "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                            }
                          >
                            {comment.mealId?.price}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
export default Comments;
