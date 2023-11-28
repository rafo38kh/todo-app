"use client";
import { useState, useEffect } from "react";

import Input from "@/components/Input";
import NotLoggedIn from "@/components/NotLoggedIn";
import TopSettings from "@/components/TopSettings";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth =
      typeof window !== "undefined"
        ? JSON.parse(window?.localStorage?.getItem("auth"))
        : null;

    if (auth !== null) setIsLoggedIn(true);
  }, []);

  return (
    <div className="">
      <TopSettings isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      {!isLoggedIn ? <NotLoggedIn /> : <Input />}
    </div>
  );
}
