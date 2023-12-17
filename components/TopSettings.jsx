import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { useGetUsersInfo } from "@/hooks/useGetUsersInfo";

import Auth from "./Auth";
import UserInfo from "./UserInfo";
import ChangeTheme from "./ChangeTheme";

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
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: [-100, 20, 0], opacity: 1 }}
        transition={{ type: "tween", duration: 0.3 }}
        className="flex w-full justify-between"
      >
        <span className="inline-block flex-shrink-0 text-2xl tracking-[0.4rem] font-bold text-buttonCol">
          ToDo List
        </span>

        <div
          ref={buttonRef}
          className="relative w-full flex items-center justify-end"
        >
          <button
            type="button"
            onClick={handleSettingsOpen}
            className={`relative rounded-full overflow-hidden w-7 aspect-square ${
              profilePhoto ? "border-[2px] border-slateGray" : null
            }`}
          >
            {profilePhoto ? (
              <Image src={profilePhoto} fill alt="Picture of the author" />
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

          {showSettings && (
            <div
              ref={menuRef}
              className="absolute z-50 top-12 right-0 border-[0.1px] border-lightCyan/50 bg-tangerine dark:bg-TopSettingsBg p-4 rounded-lg flex flex-col justify-start gap-4"
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
      </motion.div>
    </div>
  );
}
