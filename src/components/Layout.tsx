import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";

interface Props {
  children?: React.ReactNode;
  menu: any
}

const navigation = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Layout: React.FC<PropsWithChildren<Props>> = ({ children, menu }) => {
  const router = useRouter();
  const current = router.pathname;

  const menus = menu.data.attributes.items.data;

  return (
    <div className="w-full h-full">
      <header className="">
        <div className="flex h-16 items-center justify-between sm:px-6 lg:px-8 border-b">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex">
              <div className="h-6 w-6 mix-blend-multiply bg-red-200 transform rotate-45"></div>
              <div className="h-6 w-6 mix-blend-multiply bg-emerald-200 transform rotate-45 -ml-1"></div>
            </div>
            <h1 className="text-2xl font-bold">Your Store</h1>
          </div>
          <div>
            <div className="h-10 w-10 rounded-full bg-red-400"></div>
          </div>
        </div>
        <div className="flex h-12 sm:px-6 lg:px-8 items-center border-b">
          <div className="flex space-x-8">
            {menus.map((menu: any) => (
              <a
                key={menu.id}
                href={menu.attributes.url}
                className={classNames(
                  current === menu.attributes.url ? "text-blue-600" : "text-gray-600 hover:text-blue-500",
                  "text-sm font-medium group py-4 relative"
                )}
              >
                <span className="">
                  {menu.attributes.title}
                </span>
                {menu.attributes.children.data.length > 0 && <div className="absolute top-[50px] w-48 bg-red-200 px-4 py-2 hidden group-hover:flex group-hover:flex-col group-hover:space-y-4">
                  {
                    menu.attributes.children.data.map((subMenu: any) => (
                      <a
                        key={subMenu.id}
                        href={subMenu.attributes.url}
                        className={classNames(
                          current === menu.attributes.url ? "text-blue-600" : "text-gray-600 hover:text-blue-500",
                          "rounded-md text-sm font-medium py-1"
                        )}
                      >
                        {subMenu.attributes.title}
                      </a>
                    ))
                  }
                </div>}
              </a>
            ))}
          </div>
        </div>
      </header>
      <main className="lg:px-8 lg:py-4">{children}</main>
    </div>
  );
};

export default Layout;
