import { ExclamationCircleIcon } from "@heroicons/react/outline";

function Error({ message }) {
  return (
    <div className="pr-3 flex items-center pointer-events-none">
      <ExclamationCircleIcon
        className="h-5 w-5 text-red-500"
        aria-hidden="true"
      />
      <p className="mt-2 text-base text-red-600" id="email-error">
        {message}
      </p>
    </div>
  );
}
export default Error;
