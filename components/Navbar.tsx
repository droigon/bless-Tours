"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { menus } from "@/public/data/menu";

interface MenuItem {
  title: string | JSX.Element;
  submenu?: MenuItem[];
  url?: string;
}

interface DropdownProps {
  submenus: MenuItem[];
  dropdown: boolean;
  depthLevel: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  submenus,
  dropdown,
  depthLevel,
}) => {
  depthLevel = depthLevel + 1;
  const dropdownClass =
    depthLevel > 1
      ? "static lg:absolute left-full z-10 bg-white min-w-[200px] top-0"
      : "top-full static lg:absolute min-w-[200px] left-0 z-10 bg-white";
  return (
    <ul
      className={`my-dropdown static duration-300 shadow-md ${dropdownClass} ${
        dropdown ? "block mt-5 lg:mt-0" : "hidden"
      }`}>
      {submenus.map((submenu, index) => (
        <MenuItems depthLevel={depthLevel} items={submenu} key={index} />
      ))}
    </ul>
  );
};

interface MenuItemsProps {
  items: MenuItem;
  depthLevel: number;
}

const MenuItems: React.FC<MenuItemsProps> = ({ items, depthLevel }) => {
  const [dropdown, setDropdown] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const onMouseEnter = () => {
    window.innerWidth > 992 && setDropdown(true);
  };

  const onMouseLeave = () => {
    window.innerWidth > 992 && setDropdown(false);
  };

  useEffect(() => {
    const handler = (event: MouseEvent | TouchEvent) => {
      if (
        dropdown &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [dropdown]);

  return (
    <li
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative menu-items cursor-pointer `}
      ref={ref}>
      {items.submenu ? (
        <>
          
        </>
      ) : (
        <Link href={items.url as string}>{items.title}</Link>
      )}
    </li>
  );
};

const Navbar: React.FC = () => {
  return (
    <ul className="flex flex-col lg:flex-row menus absolute left-0 lg:top-full bg-white lg:bg-transparent w-full lg:w-auto lg:static px-2 lg:px-0">
      {menus.map((menu, index) => {
        const depthLevel = 0;
        return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
      })}
    </ul>
  );
};

export default Navbar;
