import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { auth } from "@/config/firebase";

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const auth =
      typeof window !== "undefined"
        ? JSON.parse(window?.localStorage?.getItem("auth"))
        : null;

    setUserInfo(auth);
  }, [auth?.currentUser]);

  return (
    <div>
      {userInfo?.profilePhoto && (
        <div className="flex items-center gap-2 text-lightGray">
          <div className="relative rounded-full overflow-hidden w-7 aspect-square">
            <Image
              src={userInfo?.profilePhoto}
              fill
              alt="Picture of the author"
            />
          </div>

          <span className="">{userInfo?.name}</span>
        </div>
      )}
    </div>
  );
}
