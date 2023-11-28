import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Auth from "./Auth";
import UserInfo from "./UserInfo";
import ChangeTheme from "./ChangeTheme";
import { useGetUsersInfo } from "@/hooks/useGetUsersInfo";

export default function TopSettings({ isLoggedIn, setIsLoggedIn }) {
  const [showSettings, setShowSettings] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const { profilePhoto, name } = useGetUsersInfo();

  const handleClickOutside = (e) => {
    const isSettingsButton =
      buttonRef.current && buttonRef.current.contains(e.target);

    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      !isSettingsButton
    ) {
      setShowSettings(false);
    }
  };

  const handleSettingsOpen = () => {
    setShowSettings((prevState) => !prevState);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-11/12 m-auto max-w-2xl py-4">
      <div className="flex justify-between">
        <span className="text-2xl tracking-[0.4rem] font-bold text-buttonCol">
          ToDo List
        </span>

        <button
          ref={buttonRef}
          className="relative "
          onClick={handleSettingsOpen}
          type="button"
        >
          {profilePhoto ? (
            <div className="relative rounded-full overflow-hidden w-7 aspect-square border-[2px] border-slateGray">
              <Image src={profilePhoto} fill alt="Picture of the author" />
            </div>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          )}
        </button>
      </div>

      {showSettings && (
        <div
          ref={menuRef}
          className="absolute z-50 top-12 right-5 border-[0.1px] border-lightCyan/50 bg-[#E6CBAF] dark:bg-[#244149] p-4 rounded-lg flex flex-col justify-start gap-4"
        >
          <UserInfo />
          <ChangeTheme />
          <Auth
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setShowSettings={setShowSettings}
          />
        </div>
      )}
    </div>
  );
}
