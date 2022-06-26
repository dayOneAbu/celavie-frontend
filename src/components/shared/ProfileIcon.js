import { Menu, Transition } from "@headlessui/react";
import { BellIcon, LogoutIcon, UserCircleIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useProfile from "../../hooks/useProfile";
function ProfileIcon() {
  const { profile } = useProfile();
  const { logOut } = useAuth();
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      <Menu as="div" className="lg:ml-3 mt-8 lg:mt-1 relative">
        <div>
          <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
            <img
              className="h-8 w-8 rounded-full"
              src={
                profile?.avatar
                  ? `/api/${profile?.avatar}`
                  : "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              }
              alt=""
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <Link to={"/profile/me"}>
                  <span
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "px-4 py-2 text-sm text-gray-700 flex"
                    )}
                  >
                    <UserCircleIcon className="text-red-500 mx-1 w-4 h-4" />{" "}
                    Your Profile
                  </span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link to={"/checkout/summary"}>
                  <span
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "px-4 py-2 text-sm text-gray-700 flex"
                    )}
                  >
                    <BellIcon className="text-red-500 mx-1 w-4 h-4" /> My Orders
                  </span>
                </Link>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <span
                  onClick={logOut}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "px-4 py-2 text-sm text-gray-700 flex"
                  )}
                >
                  <LogoutIcon className="text-red-500 mx-1 w-4 h-4" /> Sign out
                </span>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
export default ProfileIcon;
