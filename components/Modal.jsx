import React from "react";
import { createPortal } from "react-dom";
import { useState, useEffect, useContext } from "react";
import { FolderIDContext } from "../contexts/FolderIDContextProvider";
import { useGetTodo } from "@/hooks/useGetTodo";
import { useAddTodo } from "@/hooks/useAddTodo";

export default function Modal({ isModalOpen, setIsModalOpen }) {
  const { folderID } = useContext(FolderIDContext);
  const { folders } = useGetTodo(folderID);
  const { removeTodoFolder } = useAddTodo();

  const currentFolder = folders.find((folder) => folder?.id === folderID);

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!isModalOpen) return null;

  return mounted
    ? createPortal(
        <div className="bg-black h-screen w-full fixed inset-0 bg-black/80 flex flex-col justify-center items-end px-4 ">
          <button
            className="mb-2"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#FFF"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <div className="bg-[#faedcd] dark:bg-slateGray p-8 rounded-md max-w-sm">
            <span className="text-xl font-bold dark:text-white text-primary-700">
              Delete this folder "{currentFolder?.name}" ?
            </span>
            <p className="text-sm font-normal  my-4">
              Are you sure you want to delete the "{currentFolder?.name}" folder
              and its contents? This action cannot be reversed.
            </p>
            <button
              type="button"
              onClick={() => {
                currentFolder?.id === folderID && removeTodoFolder(folderID);
                setIsModalOpen(false);
              }}
              className="bg-[#d4a373] hover:bg-[#fefae0] dark:bg-DarkSlateGray  dark:hover:bg-lightCyan hover:text-slateGray p-4 rounded-lg w-full text-white text-sm"
            >
              Confirm & Delete
            </button>
          </div>
        </div>,
        document.body
      )
    : null;
}
