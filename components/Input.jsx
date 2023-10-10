import React, { useEffect, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import check from "../public/images/icon-check.svg";
import cross from "../public/images/icon-cross.svg";
import { db } from "@/config/firebase";
import { getDocs, collection } from "firebase/firestore";

export default function Input() {
  const [text, setText] = useState("");
  // const [todos, setTodos] = useState([]);

  const [filters, setFilters] = useState("All");
  // const itemsLength = todos.filter((todo) => !todo.completed).length;

  const todoCollectionRef = collection(db, "todoList");

  useEffect(() => {
    const getTodolist = async () => {
      try {
        const data = await getDocs(todoCollectionRef);
      } catch (err) {
        console.error(err);
      }
    };

    getTodolist();
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    setTodos((prevState) => [
      ...prevState,
      {
        id: uuidv4(),
        text: text,
        completed: false,
      },
    ]);

    setText("");
  };

  const checkCompleted = (el) => {
    setTodos((prev) =>
      prev.map((elem) =>
        el.id === elem.id ? { ...elem, completed: !elem.completed } : elem
      )
    );
  };

  const handleDelete = (todo) => {
    setTodos((prev) => prev.filter((el) => todo.id !== el.id));
  };

  return (
    <div className="w-11/12 m-auto max-w-2xl">
      <form className="mb-4" action="" onSubmit={addTodo}>
        <input
          className="w-full dark:bg-bgBlueDark p-4 rounded-lg text-GrayishBlueText bg-lightGray"
          type="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <ul className="rounded-lg  h-[33rem] overflow-scroll">
        {todos
          .filter((todo) => {
            if (filters === "All") return todos;
            if (filters === "Active") return !todo.completed;
            if (filters === "Completed") return todo.completed;
          })
          .reverse()
          .map((todo) => (
            <li
              className={`flex flex-row truncate group w-full last:border-b-0 dark:bg-bgBlueDark p-4 border-b dark:border-b-DarkGrayishBlueBorder border-b-bg-LightGrayishBlue dark:text-text-darkGrayishBlue text-lightText bg-lightGray ${
                todo.completed &&
                "line-through dark:text-GrayishBlueText text-GrayishBlue"
              }`}
              key={todo.id}
            >
              <button className="mr-4" onClick={() => checkCompleted(todo)}>
                {todo.completed ? (
                  <div className="rounded-full h-6 w-6 border border-DarkGrayishBlueBorder flex items-center justify-center bg-gradient-to-r from-grCyan to-grPurple hover:border">
                    <Image alt="check" src={check} />
                  </div>
                ) : (
                  <div className="rounded-full h-6 w-6 border border-DarkGrayishBlueBorder" />
                )}
              </button>

              {todo.text}

              <button className=" ml-auto" onClick={() => handleDelete(todo)}>
                <Image alt="cross" src={cross} />
              </button>
            </li>
          ))}

        {/* clear completed blok */}

        <div className="flex justify-between  dark:bg-bgBlueDark bg-lightGray p-4  dark:text-text-darkGrayishBlue text-lightText   rounded-b-lg text-sm">
          <p className="text-GrayishBlue dark:text-text-darkGrayishBlue">
            {itemsLength === 0
              ? "Nothing to do"
              : itemsLength > 1
              ? `${itemsLength} items left`
              : `${itemsLength} item left`}
          </p>

          <ul className="hidden md:flex flex-row items-center justify-center gap-6 rounded-lg  dark:bg-bgBlueDark bg-lightGray p-4 md:p-0 dark:text-text-darkGrayishBlue">
            {["All", "Active", "Completed"].map((filter, i) => (
              <li key={uuidv4()}>
                <button
                  className={filters === filter && "text-blue-500"}
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
            onClick={() =>
              setTodos((prevState) =>
                prevState.filter((todo) => !todo.completed)
              )
            }
          >
            Clear completed
          </button>
        </div>
      </ul>

      {/* filters blok */}

      <ul className="md:hidden flex flex-row items-center justify-center gap-6 mt-4 rounded-lg  dark:bg-bgBlueDark bg-lightGray p-4  dark:text-text-darkGrayishBlue">
        {["All", "Active", "Completed"].map((filter, i) => (
          <li key={uuidv4()}>
            <button
              className={`${
                filters === filter ? "text-blue-500" : "text-GrayishBlue"
              }   hover:text-darkBlue dark:hover:text-lightGray`}
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
  );
}
