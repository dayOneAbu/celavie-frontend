import Rating from "./Rating";
import { Controller, useForm } from "react-hook-form";
import Nope from "nope-validator";
import { nopeResolver } from "@hookform/resolvers/nope";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import useProfile from "../../hooks/useProfile";
import useMeal from "../../hooks/useMeal";
import { useEffect } from "react";

const schema = Nope.object().shape({
  feedback: Nope.string()
    .atLeast(4)
    .required("Please provide a longer feedback"),
  rating: Nope.number().required("Please provide  your rating"),
});

export default function CommentForm(props) {
  const { profile } = useProfile();
  const { addComment, setEditedComment, updateComment, editedComment } =
    useMeal();
  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({
    resolver: nopeResolver(schema),
  });
  useEffect(() => {
    if (editedComment.isEditing === true) {
      setValue("feedback", editedComment.item.feedback);
      setValue("rating", editedComment.item.rating);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedComment.isEditing]);

  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          alt="user profile avatar"
          src={
            profile?.avatar
              ? `/api/${profile?.avatar}`
              : "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
        />
      </div>
      <div className="min-w-0 flex-1">
        <form
          onSubmit={handleSubmit((formData) => {
            if (editedComment.isEditing === true) {
              updateComment.mutate({
                formData,
                props,
                comId: editedComment.item._id,
              });
              setEditedComment(() => {
                return { item: {}, isEditing: false };
              });
              reset();
            } else {
              addComment.mutate({ formData, props });
              reset();
            }
            reset();
          })}
          className="relative"
        >
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500">
            {errors.feedback && (
              <div className="absolute inset-y-0 mt-2 text-sm text-red-600 pr-3 flex items-center pointer-events-none">
                <ExclamationCircleIcon
                  className="h-5 w-5 text-red-500"
                  aria-hidden="true"
                />
                {errors.feedback.message}
              </div>
            )}

            <label htmlFor="feedback" className="sr-only">
              Add your feedback
            </label>
            <textarea
              rows={3}
              {...register("feedback")}
              name="feedback"
              id="feedback"
              className="block w-full py-3 px-4 border-0 resize-none focus:ring-0 sm:text-sm"
              placeholder="Add your feedback..."
              defaultValue={""}
            />

            <div className="py-2" aria-hidden="true">
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
            <div className="flex flex-col space-x-5">
              <div className="flex px-2 items-center">
                <Controller
                  control={control}
                  name="rating"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Rating
                      onChange={onChange}
                      onBlur={onBlur}
                      selected={value}
                    />
                  )}
                />
              </div>
              {errors.rating && (
                <span className="mt-1 text-sm text-red-600">
                  {errors.rating.message}
                </span>
              )}
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
