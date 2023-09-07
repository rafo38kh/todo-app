"use client";
import React from "react";
import Image from "next/image";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import Moon from "../public/images/icon-moon.svg";
import Sun from "../public/images/icon-sun.svg";

export default function ChangeTheme() {
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    const isDark = systemTheme === "dark" ? true : false;

    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, []);

  console.log(theme);

  return (
    <div className="flex flex-row justify-between w-11/12 m-auto py-10 max-w-2xl">
      <span className="uppercase text-4xl tracking-[0.4rem] font-bold text-lightGray">
        Todo
      </span>
      <button
        onClick={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
      >
        {theme === "light" ? (
          <Image src={Moon} width={30} height={30} />
        ) : (
          <Image src={Sun} width={30} height={30} />
        )}
      </button>
    </div>
  );
}
