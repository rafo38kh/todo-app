import { useEffect } from "react";

import { auth, googleProvider } from "@/config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function Auth({ isLoggedIn, setIsLoggedIn }) {
  const signInWithGoogle = async () => {
    try {
      const results = await signInWithPopup(auth, googleProvider);
      const authInfo = {
        userID: results.user.uid,
        name: results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
      };

      setIsLoggedIn(true);
      localStorage.setItem("auth", JSON.stringify(authInfo));
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      localStorage.removeItem("auth");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("auth"))) setIsLoggedIn(true);
  }, []);

  return (
    <div className="flex gap-4 items-end flex-col w-11/12 m-auto max-w-2xl pt-4 text-bgBlueDark dark:text-lightGray">
      {isLoggedIn ? (
        <button
          className="flex justify-center items-center gap-2"
          type="button"
          onClick={logOut}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
            />
          </svg>
          <span>Log Out</span>
        </button>
      ) : (
        <button
          className="flex items-center justify-center gap-2"
          type="button"
          onClick={signInWithGoogle}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="40" height="40" rx="20" fill="#F2F2F2" />
            <g clip-path="url(#clip0_710_6221)">
              <path
                d="M29.6 20.2273C29.6 19.5182 29.5364 18.8364 29.4182 18.1818H20V22.05H25.3818C25.15 23.3 24.4455 24.3591 23.3864 25.0682V27.5773H26.6182C28.5091 25.8364 29.6 23.2727 29.6 20.2273Z"
                fill="#4285F4"
              />
              <path
                d="M20 30C22.7 30 24.9636 29.1045 26.6181 27.5773L23.3863 25.0682C22.4909 25.6682 21.3454 26.0227 20 26.0227C17.3954 26.0227 15.1909 24.2636 14.4045 21.9H11.0636V24.4909C12.7091 27.7591 16.0909 30 20 30Z"
                fill="#34A853"
              />
              <path
                d="M14.4045 21.9C14.2045 21.3 14.0909 20.6591 14.0909 20C14.0909 19.3409 14.2045 18.7 14.4045 18.1V15.5091H11.0636C10.3864 16.8591 10 18.3864 10 20C10 21.6136 10.3864 23.1409 11.0636 24.4909L14.4045 21.9Z"
                fill="#FBBC04"
              />
              <path
                d="M20 13.9773C21.4681 13.9773 22.7863 14.4818 23.8227 15.4727L26.6909 12.6045C24.9591 10.9909 22.6954 10 20 10C16.0909 10 12.7091 12.2409 11.0636 15.5091L14.4045 18.1C15.1909 15.7364 17.3954 13.9773 20 13.9773Z"
                fill="#E94235"
              />
            </g>
            <defs>
              <clipPath id="clip0_710_6221">
                <rect
                  width="20"
                  height="20"
                  fill="white"
                  transform="translate(10 10)"
                />
              </clipPath>
            </defs>
          </svg>

          <span>Sign in</span>
        </button>
      )}
    </div>
  );
}
