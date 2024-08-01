import { useState } from "react";
import Image from "next/image";
import EditTodoItem from "./EditTodoItem";
import { useAddTodo } from "../hooks/useAddTodo";

import check from "../public/images/icon-check.svg";

export default function TodoItem({ todo, item, today, folderID }) {
  const [isEditing, setIsEditing] = useState(false);

  const { toggleCompleted, deletTodo } = useAddTodo();

  return (
    <li
      value={todo.id}
      className={`flex flex-row justify-between gap-2 group mb-4  border-[0.1px] dark:border-lightCyan/50 border-DarkSlateGray rounded-md p-4`}
    >
      <div className="flex justify-center items-center w-full">
        <button
          className="mr-4"
          onClick={() => toggleCompleted(todo, folderID)}
        >
          {todo.completed ? (
            <div className="rounded-full h-6 w-6 border  flex items-center justify-center bg-gradient-to-r from-tangerine dark:from-slateGray to-pantone">
              <Image alt="check" src={check} />
            </div>
          ) : (
            <div className="rounded-full h-6 w-6 border border-DarkSlateGray dark:border-lightCyan" />
          )}
        </button>
        <div className="flex flex-col w-full max-w-[17rem] md:max-w-full">
          <span className={`uppercase text-[.6rem] pl-2 $`}>
            {item.date === today ? "Today" : item.date}
          </span>
          {isEditing ? (
            <EditTodoItem
              todo={todo}
              isEditing={isEditing}
              setIsEditing={setIsEditing}
            />
          ) : (
            <>
              <span className={` pl-2  ${todo.completed && "line-through "}`}>
                {todo.todo}
              </span>
            </>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="flex gap-4 items-center flex-row">
          <button onClick={() => setIsEditing(true)}>
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
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>

          <button
            className="bottom-10"
            onClick={() => deletTodo(todo.id, folderID)}
          >
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
      )}
    </li>
  );
}
