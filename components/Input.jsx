import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import check from "../public/images/icon-check.svg";
import { useAddTodo } from "../hooks/useAddTodo";
import { useGetTodo } from "../hooks/useGetTodo";
import { FolderIDContext } from "@/contexts/FolderIDContextProvider";
import EditTodoItem from "./EditTodoItem";
import Modal from "./Modal";

export default function Input() {
  const { folderID, setFolderID } = useContext(FolderIDContext);

  const {
    addTodoToFolder,
    toggleCompleted,
    deletTodo,
    filterCompleted,
    createFolder,
  } = useAddTodo();
  const { todos, setTodos, folders } = useGetTodo(folderID);

  const [text, setText] = useState("");
  const [filters, setFilters] = useState("All");
  const [folderName, setFolderName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsLength = todos?.filter((todo) => !todo?.completed).length;

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

  const onSubmit = (e) => {
    e.preventDefault();

    addTodoToFolder(folderID, text);

    setText("");
  };

  const handleDelete = (todo) => {
    setTodos((prev) => prev.filter((el) => todo.id !== el.id));
  };

  useEffect(() => {
    if (folders) setFolderID(folders?.at(0)?.id);
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
    <div>
      <div className="my-5 w-full p-4 m-auto max-w-2xl bg-color-1">
        <form className="flex flex-col " onSubmit={handleAddFolder}>
          {/* <label className="mb-1 text-buttonCol text-sm tracking-widest ">
            Collections
          </label> */}
          <input
            placeholder="Add folder"
            className="p-1 rounded-lg bg-[#faedcd] dark:bg-lightCyan dark:text-DarkSlateGray border-[0.1px] border-DarkSlateGray outline-none  "
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </form>

        <ul className="w-full flex flex-row gap-2 overflow-x-scroll no-scrollbar ">
          {folders?.map((folder) => (
            <li
              key={folder?.id}
              onClick={() => setFolderID(folder?.id)}
              className={`flex flex-col shrink-0 items-start  gap-1 bg-[#d4a373] dark:bg-slateGray w-40 p-3 break-all mt-4 rounded-md border-[0.1px] border-lightCyan/50 text-md  ${
                folderID === folder.id ? "dark:bg-moonstone bg-tangerine" : null
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
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>

              {`${folder?.name.slice(0, 1).toUpperCase()}${folder?.name.slice(
                1
              )}`}
            </li>
          ))}
        </ul>
      </div>

      <ul className="flex flex-row items-center justify-end gap-6 dark:bg-bgBlueDark bg-lightGray p-4  dark:text-text-darkGrayishBlue text-lightText   rounded-lg text-sm">
        {["All", "Active", "Completed"].map((filter, i) => (
          <li key={uuidv4()}>
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

      <div className="w-11/12 m-auto max-w-2xl relative">
        {!!folders?.length && (
          <form className="mb-4" action="#" onSubmit={onSubmit}>
            <input
              placeholder="Add Todo"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 rounded-md bg-[#faedcd] dark:bg-lightCyan dark:text-DarkSlateGray border-[0.1px] border-DarkSlateGray focus:outline-none focus:border-color-5"
            />
          </form>
        )}
        <ul className=" max-h-[calc(100vh-30rem)] overflow-scroll no-scrollbar">
          {constructTodoList(todos).map((item) => (
            <li key={uuidv4()} className="rounded-lg">
              <ul className="rounded-b-lg overflow-hidden ">
                {item.todos
                  .filter((todo) => {
                    if (filters === "All") return todo;
                    if (filters === "Active") return !todo.completed;
                    if (filters === "Completed") return todo.completed;
                  })
                  .map((todo) => {
                    return (
                      <li
                        id={todo.id}
                        key={todo.id}
                        value={todo.id}
                        className={`flex flex-row justify-between truncate group mb-4 w-full border-[0.1px] dark:border-lightCyan/50 border-DarkSlateGray rounded-md  p-4`}
                      >
                        <div className="flex justify-center items-center">
                          <button
                            className="mr-4"
                            onClick={() => toggleCompleted(todo, folderID)}
                          >
                            {todo.completed ? (
                              <div className="rounded-full h-6 w-6 border  flex items-center justify-center bg-gradient-to-r from-tangerine dark:from-slateGray to-color_2">
                                <Image alt="check" src={check} />
                              </div>
                            ) : (
                              <div className="rounded-full h-6 w-6 border border-DarkSlateGray dark:border-lightCyan" />
                            )}
                          </button>
                          <div className="flex flex-col">
                            <span className="uppercase text-[.6rem] inline-block">
                              {item.date === today ? "Today" : item.date}
                            </span>
                            {isEditing ? (
                              <EditTodoItem
                                todo={todo}
                                isEditing={isEditing}
                                setIsEditing={setIsEditing}
                              />
                            ) : (
                              <span
                                className={todo.completed && "line-through "}
                              >
                                {todo.todo}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="  flex gap-4 items-center flex-row">
                          {!isEditing && (
                            <button
                              // className="absolute"
                              onClick={() => setIsEditing(true)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  path
                                  // fill="#494C6B"
                                  // fill-rule="evenodd"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>
                          )}
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
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </li>
          ))}
        </ul>

        {/* clear completed block */}
        <>
          <div className="invisible sm:hidden md:visible md:flex justify-between mt-4 dark:bg-bgBlueDark bg-lightGray p-4  dark:text-text-darkGrayishBlue text-lightText   rounded-lg text-sm fixed w-11/12 m-auto max-w-2xl">
            <p className="text-GrayishBlue dark:text-text-darkGrayishBlue">
              {itemsLength === 0
                ? "Nothing to do"
                : itemsLength > 1
                ? `${itemsLength} items left`
                : `${itemsLength} item left`}
            </p>

            <ul className="flex flex-row items-center justify-center gap-6 rounded-lg  dark:bg-bgBlueDark bg-lightGray p-4 md:p-0 dark:text-text-darkGrayishBlue ">
              {["All", "Active", "Completed"].map((filter, i) => (
                <li key={uuidv4()}>
                  <button
                    className={filters === filter ? "text-moonstone" : null}
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
              className="hover:text-darkBlue text-GrayishBlue dark:text-text-darkGrayishBlue dark:hover:text-lightGray"
              onClick={() => filterCompleted(todos, folderID)}
            >
              Clear completed
            </button>
          </div>
        </>
        {/* filters block */}
        <div className="md:hidden flex flex-col justify-between gap-4 mt-4 fixed w-11/12 m-auto max-w-2xl">
          <div className="flex justify-between dark:bg-bgBlueDark bg-lightGray p-4  dark:text-text-darkGrayishBlue text-lightText   rounded-lg text-sm">
            <p className="text-GrayishBlue dark:text-text-darkGrayishBlue">
              {itemsLength === 0
                ? "Nothing to do"
                : itemsLength > 1
                ? `${itemsLength} items left`
                : `${itemsLength} item left`}
            </p>

            <button
              className="hover:text-darkBlue text-GrayishBlue dark:text-text-darkGrayishBlue dark:hover:text-lightGray"
              onClick={() => filterCompleted(todos, folderID)}
            >
              Clear completed
            </button>
          </div>
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>
  );
}
