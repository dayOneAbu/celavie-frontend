import { XIcon } from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import api from "../../utils/api";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";

function Searchbar() {
  const [filter, setFilter] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery(
    ["searchResult"],
    () => {
      return api.get(`/meals/search/${query}`).then((res) => res.data.message);
    },
    {
      enabled: filter,
      onSuccess: (data) => {
        console.log(data);
      },
      initialData: [],
      retry: 0,
    }
  );
  function onchangeHandler(e) {
    setFilter(e.target.value);
  }
  const { register, handleSubmit } = useForm();
  //TODO: insert original data and search

  return (
    <form
      onSubmit={handleSubmit((formData) => {
        setQuery(formData.search);
      })}
      className="flex-1 flex"
    >
      <div className="relative w-full focus-within:text-orange-600">
        <button
          className="absolute inset-y-0 text-white left-0 flex items-center"
          onClick={() => setOpen(true)}
        >
          <SearchIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <span className="flex items-center justify-center">
          <span className="flex flex-1">
            <input
              id="search"
              name="search"
              {...register("search")}
              // onChange={onchangeHandler}
              className={`${
                open === false ? "hidden" : "block"
              } w-full h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent sm:text-sm`}
              placeholder="Search transactions"
              type="search"
            />
          </span>
          <button type="submit" onClick={() => setFilter(!filter)}>
            <SearchIcon
              className={`${
                open === false ? "hidden" : "block"
              } h-8 w-8 text-orange-700`}
              aria-hidden="true"
            />
          </button>
        </span>
        <SearchModal openValue={filter} />
      </div>
    </form>
  );
}
export default Searchbar;

const team = [
  {
    name: "Leslie Alexander",
    handle: "lesliealexander",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "online",
  },
  // More people...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function SearchModal({ openValue, data }) {
  const [searchOpen, setSearchOpen] = useState(openValue);
  useEffect(() => {}, [openValue]);
  return (
    <Transition.Root show={searchOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 self-center flex  left-1/3 items-center justify-center overflow-hidden"
        onClose={setSearchOpen}
      >
        <div className="absolute  inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="pointer-events-none fixed inset-y-0  flex max-w-full pl-10 sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
            >
              <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        {" "}
                        Team{" "}
                      </Dialog.Title>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                          onClick={() => setSearchOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <ul className="flex-1 divide-y divide-gray-200 overflow-y-auto">
                    {team.map((person) => (
                      <li key={person.handle}>
                        <div className="group relative flex items-center py-6 px-5">
                          <a
                            href={person.href}
                            className="-m-1 block flex-1 p-1"
                          >
                            <div
                              className="absolute inset-0 group-hover:bg-gray-50"
                              aria-hidden="true"
                            />
                            <div className="relative flex min-w-0 flex-1 items-center">
                              <span className="relative inline-block flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={person.imageUrl}
                                  alt=""
                                />
                                <span
                                  className={classNames(
                                    person.status === "online"
                                      ? "bg-green-400"
                                      : "bg-gray-300",
                                    "absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white"
                                  )}
                                  aria-hidden="true"
                                />
                              </span>
                              <div className="ml-4 truncate">
                                <p className="truncate text-sm font-medium text-gray-900">
                                  {person.name}
                                </p>
                                <p className="truncate text-sm text-gray-500">
                                  {"@" + person.handle}
                                </p>
                              </div>
                            </div>
                          </a>
                          <Menu
                            as="div"
                            className="relative ml-2 inline-block flex-shrink-0 text-left"
                          >
                            <Menu.Button className="group relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              <span className="flex h-full w-full items-center justify-center rounded-full">
                                <DotsVerticalIcon
                                  className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              </span>
                            </Menu.Button>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute top-0 right-9 z-10 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block px-4 py-2 text-sm"
                                        )}
                                      >
                                        View profile
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "block px-4 py-2 text-sm"
                                        )}
                                      >
                                        Send message
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
