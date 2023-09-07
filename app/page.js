"use client";
import ChangeTheme from "@/components/ChangeTheme";
import Input from "@/components/Input";

export default function Home() {
  return (
    <div className="dark:bg-bgMDark bg-bgMLight dark:lg:bg-bgDDark lg:bg-bgDLight bg-contain h-screen w-full bg-no-repeat  dark:bg-darkBlue dark:text-white bg-lightGrayishBlue  text-black ">
      <ChangeTheme />
      <Input />
    </div>
  );
}
