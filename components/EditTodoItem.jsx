"use client";
import { useState, useContext } from "react";
import { useTheme } from "next-themes";

import { useAddTodo } from "@/hooks/useAddTodo";
import { FolderIDContext } from "@/contexts/FolderIDContextProvider";

export default function EditTodoItem({ todo, isEditing, setIsEditing }) {
  const { theme } = useTheme();
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
      className="flex items-start justify-between gap-2 w-full"
    >
      <input
        className="bg-[#fefae0] dark:bg-DarkSlateGray "
        type="text"
        value={updatedText}
        onChange={(e) => setUpdatedText(e.target.value)}
      />

      <button type="button" onClick={handleEditSubmit}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    </form>
  );
}
