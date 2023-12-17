import { useAddTodo } from "../hooks/useAddTodo";
import { FolderIDContext } from "@/contexts/FolderIDContextProvider";
import { motion } from "framer-motion";

import { useState, useContext } from "react";

export default function InputToDo() {
  const [text, setText] = useState("");
  const { addTodoToFolder } = useAddTodo();
  const { folderID, setFolderID } = useContext(FolderIDContext);

  const onSubmit = (e) => {
    e.preventDefault();

    addTodoToFolder(folderID, text);

    setText("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, type: "tween" }}
      className="mb-4"
      action="#"
      onSubmit={onSubmit}
    >
      <input
        placeholder="Add Todo"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-4 rounded-md bg-[#faedcd] dark:bg-lightCyan dark:text-DarkSlateGray border-[0.1px] border-DarkSlateGray focus:outline-none focus:border-color-5"
      />
    </motion.form>
  );
}
