import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import check from "../public/images/icon-check.svg";
import cross from "../public/images/icon-cross.svg";
import { db } from "@/config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useAddTodo } from "../hooks/useAddTodo";
import { useGetTodo } from "../hooks/useGetTodo";
import { FolderIDContext } from "@/contexts/FolderIDContextProvider";
import EditTodoItem from "./EditTodoItem";

export default function Input({ isLoggedIn }) {
  const { folderID, setFolderID } = useContext(FolderIDContext);

  const {
    addTodoToFolder,
    toggleCompleted,
    deletTodo,
    filterCompleted,
    createFolder,
    removeTodoFolder,
  } = useAddTodo();
  const { todos, folders } = useGetTodo(folderID);

  const [text, setText] = useState("");
  const [filters, setFilters] = useState("All");
  const [folderName, setFolderName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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

  // console.log(todos);

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

  return !isLoggedIn ? (
    <span className="text-GrayishBlue bg-lightGray rounded-lg  dark:bg-bgBlueDark mt-4 w-full inline-block text-center p-4">
      Not Logged In
    </span>
  ) : (
    <div>
      <div className="w-11/12 m-auto max-w-2xl relative">
        <form className="mb-4" action="#" onSubmit={onSubmit}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full dark:bg-bgBlueDark p-4 rounded-lg text-GrayishBlueText bg-lightGray"
          />
        </form>
        <ul className=" max-h-[calc(100vh-25rem)] overflow-scroll">
          {constructTodoList(todos).map((item) => (
            <li key={uuidv4()} className="rounded-lg">
              <span className="uppercase text-xs font-bold dark:bg-DarkGrayishBlueBorder bg-bg-LightGrayishBlue w-full text-lightText dark:text-text-darkGrayishBlue px-5 py-2 inline-block rounded-t-lg">
                {item.date === today ? "Today" : item.date}
              </span>

              <ul className="rounded-b-lg overflow-hidden mb-4">
                {item.todos
                  .filter((todo) => {
                    if (filters === "All") return todo;
                    if (filters === "Active") return !todo.completed;
                    if (filters === "Completed") return todo.completed;
                  })
                  .map((todo) => (
                    <li
                      key={todo.id}
                      className={`flex flex-row justify-between truncate group w-full last:border-b-0 dark:bg-bgBlueDark p-4 border-b dark:border-b-DarkGrayishBlueBorder border-b-bg-LightGrayishBlue dark:text-text-darkGrayishBlue text-lightText bg-lightGray ${
                        todo.completed &&
                        "line-through dark:text-GrayishBlueText text-GrayishBlue"
                      }`}
                    >
                      <div className="flex justify-center items-center">
                        <button
                          className="mr-4"
                          onClick={() => toggleCompleted(todo, folderID)}
                        >
                          {todo.completed ? (
                            <div className="rounded-full h-6 w-6 border border-DarkGrayishBlueBorder flex items-center justify-center bg-gradient-to-r from-grCyan to-grPurple hover:border">
                              <Image alt="check" src={check} />
                            </div>
                          ) : (
                            <div className="rounded-full h-6 w-6 border border-DarkGrayishBlueBorder" />
                          )}
                        </button>
                        {isEditing ? (
                          <EditTodoItem
                            todo={todo}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                          />
                        ) : (
                          <span>{todo.todo}</span>
                        )}
                      </div>
                      <div className="flex justify-center items-center gap-6">
                        {!isEditing && (
                          <button onClick={() => setIsEditing(true)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              class="w-6 h-6"
                            >
                              <path
                                path
                                // fill="#494C6B"
                                // fill-rule="evenodd"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </button>
                        )}
                        <button
                          className=" ml-auto"
                          onClick={() => deletTodo(todo.id, folderID)}
                        >
                          <Image alt="cross" src={cross} />
                        </button>
                      </div>
                    </li>
                  ))}
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
                    className={filters === filter ? "text-blue-500" : null}
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
          <div className="mt-20">
            <form className="flex flex-col " onSubmit={handleAddFolder}>
              <label>Create new folder</label>
              <input
                className=" dark:bg-bgBlueDark p-4 rounded-lg text-GrayishBlueText bg-lightGray"
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </form>

            <ul className="w-full  flex flex-row gap-2">
              {folders?.map((folder) => (
                <li
                  key={folder?.id}
                  onClick={() => setFolderID(folder?.id)}
                  className={`flex flex-col gap-2 w-40 p-4  bg-[#1E1F30] my-4 rounded-lg border-2 border-transparent text-sm ${
                    folderID === folder?.id
                      ? "text-white shadow-md shadow-grPurple"
                      : "text-slate-500"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => removeTodoFolder(folderID)}
                  >
                    delete folder
                  </button>
                  {folder?.name}
                </li>
              ))}
            </ul>
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

          <ul className="flex flex-row items-center justify-center gap-6 dark:bg-bgBlueDark bg-lightGray p-4  dark:text-text-darkGrayishBlue text-lightText   rounded-lg text-sm">
            {["All", "Active", "Completed"].map((filter, i) => (
              <li key={uuidv4()}>
                <button
                  className={filters === filter ? "text-blue-500" : null}
                  onClick={() => {
                    setFilters(filter);
                  }}
                >
                  {filter}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
