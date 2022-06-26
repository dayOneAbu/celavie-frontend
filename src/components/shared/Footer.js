import React from "react";
import logo from "../../asset/Celavie.png";
const footerNavigation = {
  Links: [
    { name: "Home", href: "/" },
    { name: "Menu", href: "/menu" },
    { name: "HireUS", href: "/hire" },
    { name: "About", href: "/about" },
  ],
  services: [
    { name: "birthday", href: "/hire" },
    { name: "wedding", href: "/hire" },
    { name: "catering", href: "/hire" },
    { name: "special events", href: "/hire" },
  ],
};
function Footer() {
  return (
    <footer className="bg-orange-500 items-center  mt-4 md:flex">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          <div className="space-y-8 col-span-2">
            <img className="h-32 w-full" src={logo} alt="Company name" />
            <p className="text-white capitalize text-xl">
              celavie chicken and burger{" "}
              <span className="text-white capitalize block text-base">
                Making your day <span className="text-3xl">delicious</span>
              </span>
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 col-span-2">
            <div className="md:grid col-span-2 md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm underline font-semibold text-gray-900 tracking-wider uppercase">
                  Links
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerNavigation.Links.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-white capitalize hover:text-gray-300"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm  underline font-semibold text-gray-900 tracking-wider uppercase">
                  services
                </h3>
                <ul className="mt-4 space-y-4">
                  {footerNavigation.services.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-white capitalize hover:text-gray-300"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-base text-white capitalize xl:text-center">
            &copy;{new Date().getFullYear()} celavie chicken and burger. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
