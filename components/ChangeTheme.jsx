"use client";
import React, { useState } from "react";
import Image from "next/image";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import Moon from "../public/images/icon-moon.svg";
import Sun from "../public/images/icon-sun.svg";
import { auth } from "@/config/firebase";

export default function ChangeTheme() {
  const { systemTheme, theme, setTheme } = useTheme();

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(window.localStorage.getItem("auth"));

      setUserInfo(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.currentUser]);

  useEffect(() => {
    const isDark = systemTheme === "dark" ? true : false;

    if (isDark) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-row w-11/12 m-auto py-10 max-w-2xl">
      <span className="uppercase text-4xl tracking-[0.4rem] font-bold text-lightGray">
        Tod
      </span>
      {userInfo?.profilePhoto ? (
        <div className="flex items-center gap-2">
          <div className="relative rounded-full overflow-hidden w-7 aspect-square">
            <Image
              src={userInfo?.profilePhoto}
              fill
              alt="Picture of the author"
            />
          </div>

          <span className="text-white">{userInfo?.name}</span>
        </div>
      ) : (
        <span className="uppercase text-4xl tracking-[0.4rem] font-bold text-lightGray">
          o
        </span>
      )}
      <button
        className="ml-auto"
        onClick={() =>
          theme === "light" ? setTheme("dark") : setTheme("light")
        }
      >
        {theme === "light" ? (
          <Image src={Moon} width={30} height={30} alt="icon" />
        ) : (
          <Image src={Sun} width={30} height={30} alt="icon" />
        )}
      </button>
    </div>
  );
}
