import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../../utils/api";
import { MdOutlineDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";
const headerLabel = ["Name", "email", "phone", "message", "action"];
export default function Messages() {
  const queryClient = useQueryClient();
  const { data: Messages } = useQuery(`message`, () => {
    return api.get(`/messages`).then((res) => res.data.message);
  });

  const deleteMessage = useMutation(
    (id) => api.delete(`/messages/${id}`).then((res) => res.data),
    {
      onSuccess: (data) => {
        toast.success("your message is sent successfully");
        queryClient.invalidateQueries(`message`);
      },
      onError: (err) => {
        toast.error(err);
      },
    }
  );
  return (
    <>
      <div className="px-4 sm:px-2 lg:px-4">
        <div className="flex flex-col mt-2">
          <div className="align-middle max-w-7xl grid grid-cols-7 mx-auto min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full mx-auto col-span-6 divide-y divide-gray-200">
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
                {Messages &&
                  Messages.map((message) => (
                    <tr key={message._id} className="bg-white max-w-7xl ">
                      <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <p className="text-gray-600 truncate group-hover:text-gray-900">
                            {message.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                        <span className="text-gray-900 font-medium">
                          {message.email}
                        </span>
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        <span
                          className={
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                          }
                        >
                          {message.phone}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-left w-full whitespace-nowrap text-sm text-gray-500">
                        <span className="text-gray-900 font-medium">
                          {message.message}
                        </span>
                      </td>
                      <td className="overflow-hidden whitespace-nowrap text-sm text-gray-500">
                        <span
                          className={
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                          }
                        >
                          <MdOutlineDeleteForever
                            className="h-8 w-8 text-red-500"
                            onClick={() => deleteMessage.mutate(message._id)}
                          />
                        </span>
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
