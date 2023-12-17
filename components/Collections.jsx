import { useContext } from "react";
import { FolderIDContext } from "@/contexts/FolderIDContextProvider";
import { useGetTodo } from "../hooks/useGetTodo";
import { motion } from "framer-motion";

export default function Collections({ setIsModalOpen }) {
  const { folderID, setFolderID } = useContext(FolderIDContext);
  const { folders } = useGetTodo(folderID);

  const variants = {
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.7 },
    },
    hidden: { opacity: 0 },
  };

  const item = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: 50 },
  };

  return (
    <motion.ul
      variants={variants}
      initial="hidden"
      animate="visible"
      className="w-full flex flex-row gap-2 overflow-x-scroll no-scrollbar mt-4 rounded-md"
    >
      {folders?.map((folder, idx) => (
        <motion.li
          variants={item}
          transition={{ delay: idx * 0.09, type: "tween" }}
          key={folder?.id}
          onClick={() => setFolderID(folder?.id)}
          className={`flex flex-col shrink-0 items-start  gap-1  w-40 p-3 break-all  rounded-md border-[0.1px] border-lightCyan/50 text-md  ${
            folderID === folder.id
              ? "dark:bg-moonstone bg-tangerine"
              : "bg-[#d4a373] dark:bg-slateGray"
          }`}
        >
          <div className="flex flex-row items-center justify-between w-full">
            <span className="text-[12px] text-buttonCol font-normal">
              {folder?.todosLength} tasks
            </span>
            <button type="button" onClick={() => setIsModalOpen(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-4 h-4 dark:hover:text-hoverLight hover:text-hoverDark"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
          </div>

          {`${folder?.name.slice(0, 1).toUpperCase()}${folder?.name.slice(1)}`}
        </motion.li>
      ))}
    </motion.ul>
  );
}
