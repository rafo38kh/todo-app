import { useState } from "react";
import { useAddTodo } from "../hooks/useAddTodo";
import { motion } from "framer-motion";

export default function InputCollection() {
  const { createFolder } = useAddTodo();

  const [folderName, setFolderName] = useState("");

  const handleAddFolder = async (e) => {
    e.preventDefault();

    if (!folderName) {
      console.error("Please enter both folder name and todo text.");
      return;
    }

    await createFolder(folderName);

    setFolderName("");
    setText("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.4, type: "tween" }}
      className="flex flex-col "
      onSubmit={handleAddFolder}
    >
      <input
        placeholder="Add folder"
        className="p-1 rounded-lg bg-[#faedcd] dark:bg-lightCyan dark:text-DarkSlateGray border-[0.1px] border-DarkSlateGray outline-none  "
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
      />
    </motion.form>
  );
}
