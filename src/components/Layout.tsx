import Link from "next/link";
import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";

interface Props {
  children?: React.ReactNode;
  menu: any;
}

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
            <h1 className="text-2xl font-bold cursor-pointer"><Link href={"/"}>Your Store</Link></h1>
          </div>
          <div>
            <div className="h-10 w-10 rounded-full bg-red-400"></div>
          </div>
        </div>
        <div className="flex h-12 sm:px-6 lg:px-8 items-center border-b">
          <div className="flex space-x-8">
            {menus.map((menu: any) => (
              <div
                className="group relative"
                key={menu.id}
              >
                <a
                  href={menu.attributes.url}
                  className={classNames(
                    current === menu.attributes.url
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500",
                    "text-sm font-medium py-4"
                  )}
                >
                  {menu.attributes.title}
                </a>
                {menu.attributes.children.data.length > 0 && (
                  <div className="absolute z-50 top-[36px] w-48 bg-red-200 px-4 py-2 hidden group-hover:flex group-hover:flex-col group-hover:space-y-4">
                    {menu.attributes.children.data.map((subMenu: any) => (
                      <a
                        key={subMenu.id}
                        href={`${menu.attributes.url}${subMenu.attributes.url}`}
                        className={classNames(
                          current === menu.attributes.url
                            ? "text-blue-600"
                            : "text-gray-600 hover:text-blue-500",
                          "rounded-md text-sm font-medium py-1"
                        )}
                      >
                        {subMenu.attributes.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
