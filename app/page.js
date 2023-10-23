"use client";
import { useState } from "react";
import ChangeTheme from "@/components/ChangeTheme";
import Input from "@/components/Input";
import Auth from "@/components/Auth";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="dark:bg-bgMDark bg-bgMLight dark:lg:bg-bgDDark lg:bg-bgDLight bg-contain h-screen w-full bg-no-repeat  dark:bg-darkBlue dark:text-white bg-lightGrayishBlue  text-black ">
      <Auth isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <ChangeTheme />
      <Input isLoggedIn={isLoggedIn} />
    </div>
  );
}
