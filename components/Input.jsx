import { useState, useEffect, useContext } from "react";
import { v4 as uuidv4 } from "uuid";

import { FolderIDContext } from "@/contexts/FolderIDContextProvider";

import { useAddTodo } from "../hooks/useAddTodo";
import { useGetTodo } from "../hooks/useGetTodo";

import Modal from "./Modal";
import TodoItem from "./TodoItem";
import InputToDo from "./InputToDo";
import Collections from "./Collections";
import InputCollection from "./InputCollection";

export default function Input() {
  const { folderID, setFolderID } = useContext(FolderIDContext);

  const { filterCompleted } = useAddTodo();
  const { todos, setTodos, folders } = useGetTodo(folderID);

  const [filters, setFilters] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsLength = todos?.filter((todo) => !todo?.completed).length;

  useEffect(() => {
    if (folders) {
      const previousFolderLength = localStorage.getItem("previousFolderLength");
      const currentFolderLength = folders.length;

      if (currentFolderLength > previousFolderLength) {
        setFolderID(folders[0]?.id);
      }

      localStorage.setItem("previousFolderLength", currentFolderLength);
    }
  }, [folders]);

  const firebaseDateToRegular = (todo) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    return (
      todo &&
      new Intl.DateTimeFormat("en-US", options).format(
        todo?.seconds * 1000 + todo?.nanoseconds / 1000000
      )
    );
  };

  const formatDates = () => {
    const days = todos?.map((todo) => firebaseDateToRegular(todo?.createdAt));

    const formatedUniqueDates = new Set(days);

    return formatedUniqueDates;
  };

  const constructTodoList = (todos) => {
    const formattedDates = formatDates();
    const result = [];

    for (const date of formattedDates) {
      const todosWithSameDate = todos?.filter(
        (todo) => firebaseDateToRegular(todo?.createdAt) === date
      );

      const todoObject = {
        date: date,
        todos: todosWithSameDate,
      };

      result.push(todoObject);
    }

    return result;
  };

  const today = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="px-4">
      <div className="my-5 w-full m-auto max-w-2xl">
        <InputCollection />
        <Collections setIsModalOpen={setIsModalOpen} />
      </div>

      <ul className="flex flex-row items-center justify-end gap-6 py-4 md:hidden text-lightText max-w-2xl m-auto rounded-lg text-sm">
        {["All", "Active", "Completed"].map((filter, i) => (
          <li
            className="dark:hover:text-hoverLight hover:text-hoverDark"
            key={uuidv4()}
          >
            <button
              className={
                filters === filter ? "dark:text-moonstone text-[#E29578]" : null
              }
              onClick={() => {
                setFilters(filter);
              }}
            >
              {filter}
            </button>
          </li>
        ))}
      </ul>

      <div className="w-full m-auto max-w-2xl relative">
        {!!folders?.length && <InputToDo />}
        <ul className=" max-h-[calc(100vh-30rem)] overflow-scroll no-scrollbar">
          {constructTodoList(todos).map((item) => (
            <li key={uuidv4()} className="rounded-lg">
              <ul className="rounded-b-lg overflow-hidden">
                {item.todos
                  .filter((todo) => {
                    if (filters === "All") return todo;
                    if (filters === "Active") return !todo.completed;
                    if (filters === "Completed") return todo.completed;
                  })
                  .map((todo) => (
                    <TodoItem
                      todo={todo}
                      item={item}
                      today={today}
                      key={uuidv4()}
                      folderID={folderID}
                    />
                  ))}
              </ul>
            </li>
          ))}
        </ul>

        {/* clear completed block */}
        <>
          <div className="invisible hidden md:visible md:flex justify-between mt-4  py-4 rounded-lg text-sm fixed w-11/12 m-auto max-w-2xl">
            <p>
              {itemsLength === 0
                ? "Nothing to do"
                : itemsLength > 1
                ? `${itemsLength} items left`
                : `${itemsLength} item left`}
            </p>

            <ul className="flex flex-row items-center justify-center gap-6 rounded-lg p-4 md:p-0">
              {["All", "Active", "Completed"].map((filter, i) => (
                <li
                  key={uuidv4()}
                  className="dark:hover:text-hoverLight hover:text-hoverDark"
                >
                  <button
                    className={
                      filters === filter
                        ? "text-tangerine dark:text-moonstone"
                        : null
                    }
                    onClick={() => {
                      setFilters(filter);
                    }}
                  >
                    {filter}
                  </button>
                </li>
              ))}
            </ul>

            <button
              className="dark:hover:text-hoverLight hover:text-hoverDark"
              onClick={() => filterCompleted(todos, folderID)}
            >
              Clear completed
            </button>
          </div>
        </>
        {/* filters block */}

        <div className="md:hidden flex flex-row justify-between gap-4 mt-4 fixed w-11/12 m-auto max-w-2xl p-4 text-lightText rounded-lg text-sm">
          <p>
            {itemsLength === 0
              ? "Nothing to do"
              : itemsLength > 1
              ? `${itemsLength} items left`
              : `${itemsLength} item left`}
          </p>

          <button className="" onClick={() => filterCompleted(todos, folderID)}>
            Clear completed
          </button>
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
