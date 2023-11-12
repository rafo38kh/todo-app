"use client";
import { useState, useContext } from "react";

import { useAddTodo } from "@/hooks/useAddTodo";
import { FolderIDContext } from "@/contexts/FolderIDContextProvider";

export default function EditTodoItem({ todo, isEditing, setIsEditing }) {
  const { updateTodo } = useAddTodo();
  const { folderID } = useContext(FolderIDContext);

  const [updatedText, setUpdatedText] = useState(todo.todo);

  const handleEditSubmit = () => {
    updateTodo(todo.id, updatedText, folderID);

    setIsEditing(false);
  };

  return (
    <form
      onSubmit={handleEditSubmit}
      className="flex items-center justify-between w-full"
    >
      <input
        className="dark:bg-bgBlueDark border-b-[.0625rem] border-transparent outline-none focus:border-white/30"
        type="text"
        value={updatedText}
        onChange={(e) => setUpdatedText(e.target.value)}
      />

      <button type="button" onClick={handleEditSubmit}>
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9">
          <path
            fill="none"
            stroke="#FFF"
            stroke-width="2"
            d="M1 4.304L3.696 7l6-6"
          />
        </svg>
      </button>
    </form>
  );
}
