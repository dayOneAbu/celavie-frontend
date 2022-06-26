import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MenuIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import NavCart from "./NavCart";
import ProfileIcon from "./ProfileIcon";
import logo from "../../asset/Celavie.png";

import useAuth from "../../hooks/useAuth";
import Searchbar from "./Searchbar";
const pages = [
  { name: "Home", href: "/" },
  { name: "Menu", href: "/menu" },
  { name: "HireUS", href: "/hire" },
  { name: "About", href: "/about" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 pt-5 pb-2 flex">
                <button
                  type="button"
                  className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                {pages.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link
                      to={page.href}
                      onClick={() => setOpen(false)}
                      className="-m-2 p-2 block font-medium text-xl  text-gray-900"
                    >
                      {page.name}
                    </Link>
                  </div>
                ))}
              </div>
              {isLoggedIn ? null : (
                <div className="border-t border-gray-200 py-6 px-4 space-y-6">
                  <div className="flow-root">
                    <Link
                      to={"#"}
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Sign in
                    </Link>
                  </div>
                  <div className="flow-root">
                    <Link
                      to
                      className="-m-2 p-2 block font-medium text-gray-900"
                    >
                      Create account
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      <header className="relative bg-orange-500">
        <p className=" h-10 flex items-center bg-gray-900 justify-center text-sm font-medium text-white px-4 sm:px-6 lg:px-8">
          Order Now! and Get free delivery
        </p>
        <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-2 py-2 ">
          <>
            <div className="h-auto grid grid-cols-6 gap-1">
              <div className="flex w-full col-span-3 items-center lg:col-span-2">
                <button
                  type="button"
                  className="p-2 h-8 -ml-2 rounded-md lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <MenuIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="lg:flex-1 lg:ml-0">
                  <Link to="/">
                    <img
                      className="h-24 bg-orange-500 mx-auto object-contain w-auto"
                      src={logo}
                      alt="celavie chicken and burger logo"
                    />
                  </Link>
                </div>
              </div>

              <div className="hidden col-span-2 items-center justify-evenly lg:block lg:self-stretch">
                <div className="h-full flex justify-evenly items-center space-x-4">
                  {pages.map((page) => (
                    <Link
                      key={page.name}
                      to={page.href}
                      className="flex items-center text-sm font-medium text-white hover:text-gray-800"
                    >
                      {page.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="ml-auto flex justify-end col-span-2 items-center">
                <span className="p-2 text-gray-400 hover:text-gray-500">
                  <Searchbar />
                </span>

                <NavCart />
                {isLoggedIn ? (
                  <ProfileIcon />
                ) : (
                  <div className="hidden lg:ml-4 lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-2">
                    <Link
                      to={"/login"}
                      state={{ ...location }}
                      replace
                      className="text-sm font-medium text-white hover:text-gray-800"
                    >
                      Sign in
                    </Link>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <Link
                      to={"/register"}
                      state={{ ...location }}
                      replace
                      className="text-sm font-medium text-white hover:text-gray-800"
                    >
                      Create account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </>
        </nav>
      </header>
    </>
  );
}
