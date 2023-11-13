"use client";
import React, { useState } from "react";
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

  return (
    <button
      className=" flex flex-row gap-2 text-lightGray items-center"
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
    >
      {theme === "light" ? (
        <Image src={Moon} width={30} height={30} alt="icon" />
      ) : (
        <Image src={Sun} width={30} height={30} alt="icon" />
      )}
      <span className="block">Switch theme</span>
    </button>
  );
}
