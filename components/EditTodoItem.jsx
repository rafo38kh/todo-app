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
    <form onSubmit={handleEditSubmit} className="flex  gap-2 w-full  pr-4">
      <input
        className="bg-tangerine/30 dark:bg-moonstone rounded-md px-2 w-[calc(100%-2.5rem)] "
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
          class="w-4 h-4 dark:hover:text-hoverLight hover:text-hoverDark"
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
