import React from "react";
import Image from "next/image";

import { useGetUsersInfo } from "@/hooks/useGetUsersInfo";

export default function UserInfo() {
  const { profilePhoto, name } = useGetUsersInfo();

  return (
    <div>
      {profilePhoto && name && (
        <div className="flex items-center gap-2 text-lightGray">
          <div className="relative rounded-full overflow-hidden w-7 aspect-square border-[2px] border-slateGray">
            <Image src={profilePhoto} fill alt="Picture of the author" />
          </div>

          <span className="">{name}</span>
        </div>
      )}
    </div>
  );
}
