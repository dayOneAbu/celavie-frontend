import {
  ClockIcon,
  HomeIcon,
  CollectionIcon,
  UserGroupIcon,
  DocumentAddIcon,
  ChatAltIcon,
  MailIcon,
} from "@heroicons/react/outline";

import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../asset/Celavie.png";

const navigation = [
  { name: "Home", href: "home", icon: HomeIcon, current: true },
  {
    name: "Meal Editor",
    href: "menuEditor",
    icon: DocumentAddIcon,
  },
  {
    name: "Category Editor",
    href: "categoryEditor",
    icon: CollectionIcon,
  },
  { name: "Orders", href: "orders", icon: ClockIcon },
  { name: "Comments", href: "comments", icon: ChatAltIcon },
  { name: "Customers", href: "customers", icon: UserGroupIcon },
  { name: "Messages", href: "messages", icon: MailIcon },
];

export default function Dashboard() {
  return (
    <>
      <div className="min-h-full">
        <div className="lg:flex lg:w-48 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col flex-grow bg-orange-500 pt-5 pb-4 overflow-y-auto">
            <div className="flex mt-8 items-center flex-shrink-0 px-4">
              <Link to="/">
                <img
                  className="h-16 w-full"
                  src={logo}
                  alt="Celavie chicken & burger"
                />
              </Link>
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-red-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-red-600 text-white group flex items-center  px-2 py-2 text-sm leading-6 font-medium rounded-md"
                        : "text-cyan-100 hover:text-white group flex items-center  px-2 py-2 text-sm leading-6 font-medium rounded-md hover:bg-red-600"
                    }
                    to={item.href}
                  >
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6 text-cyan-200"
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <div className="lg:pl-48 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-7xl lg:mx-auto lg:px-8">
              <div className="flex flex-1 items-center">
                <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                  Hello Manger
                </h1>
              </div>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
}
