import React, { useEffect, useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import check from "../public/images/icon-check.svg";
import cross from "../public/images/icon-cross.svg";
import { db } from "@/config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { useAddTodo } from "../hooks/useAddTodo";
import { useGetTodo } from "../hooks/useGetTodo";

export default function Input() {
  const { addTodo, toggleCompleted, deletTodo, filterCompleted } = useAddTodo();
  const { todos } = useGetTodo();

  const [text, setText] = useState("");
  const [isChecked, setIsCheked] = useState(false);

  const [filters, setFilters] = useState("All");
  const itemsLength = todos.filter((todo) => !todo.completed).length;

  // const todoCollectionRef = collection(db, "todos");

  const onSubmit = (e) => {
    e.preventDefault();
    addTodo({
      text,
      isTodo: false,
    });

    setText("");
  };

  const handleDelete = (todo) => {
    setTodos((prev) => prev.filter((el) => todo.id !== el.id));
  };

  return (
    <div className="w-11/12 m-auto max-w-2xl">
      <form className="mb-4" action="#" onSubmit={onSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full dark:bg-bgBlueDark p-4 rounded-lg text-GrayishBlueText bg-lightGray"
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
              <button className="mr-4" onClick={() => toggleCompleted(todo)}>
                {todo.completed ? (
                  <div className="rounded-full h-6 w-6 border border-DarkGrayishBlueBorder flex items-center justify-center bg-gradient-to-r from-grCyan to-grPurple hover:border">
                    <Image alt="check" src={check} />
                  </div>
                ) : (
                  <div className="rounded-full h-6 w-6 border border-DarkGrayishBlueBorder" />
                )}
              </button>

              {todo.text}

              <button className=" ml-auto" onClick={() => deletTodo(todo.id)}>
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
            onClick={
              () => filterCompleted(todos)
              // setTodos((prevState) =>
              //   prevState.filter((todo) => !todo.completed)
              // )
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
