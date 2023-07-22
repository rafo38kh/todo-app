import React, { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";
import check from "../public/images/icon-check.svg";
import cross from "../public/images/icon-cross.svg";

export default function Input() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState("All");

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

  return (
    <div className="w-11/12 m-auto">
      <form className="mb-4" action="" onSubmit={addTodo}>
        <input
          className="w-full dark:bg-bgBlueDark p-4 rounded-lg text-GrayishBlueText bg-lightGray"
          type="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <ul className="rounded-lg truncate ">
        {todos
          .filter((todo) => {
            if (filters === "All") return todos;
            if (filters === "Active") return !todo.completed;
            if (filters === "Completed") return todo.completed;
          })
          .map((el) => (
            <li
              className={`flex flex-row group w-full last:border-b-0 dark:bg-bgBlueDark p-4 border-b dark:border-b-DarkGrayishBlueBorder border-b-bg-LightGrayishBlue dark:text-text-darkGrayishBlue text-lightText bg-lightGray ${
                el.completed && "line-through text-DarkGrayishBlueBorder"
              }`}
              key={el.id}
            >
              <button
                className="mr-4"
                onClick={() =>
                  setTodos((prev) =>
                    prev.map((elem) =>
                      el.id === elem.id
                        ? { ...elem, completed: !elem.completed }
                        : elem
                    )
                  )
                }
              >
                {el.completed ? (
                  <div className="rounded-full h-6 w-6 border border-DarkGrayishBlueBorder flex items-center justify-center bg-gradient-to-r from-grCyan to-grPurple hover:border">
                    <Image alt="check" src={check} />
                  </div>
                ) : (
                  <div className="rounded-full h-6 w-6 border border-DarkGrayishBlueBorder" />
                )}
              </button>

              {el.text}

              <button
                className=" ml-auto"
                onClick={() =>
                  setTodos((prev) => prev.filter((elem) => el.id !== elem.id))
                }
              >
                <Image alt="cross" src={cross} />
              </button>
            </li>
          ))}

        {/* clear completed blok */}

        <div className="flex justify-between  dark:bg-bgBlueDark bg-lightGray p-4  dark:text-text-darkGrayishBlue text-lightText mb-4  rounded-b-lg text-sm">
          <p>{todos.filter((todo) => !todo.completed).length}items left</p>

          <ul className="hidden md:flex flex-row items-center justify-center gap-6 rounded-lg  dark:bg-bgBlueDark bg-lightGray p-4 md:p-0 dark:text-text-darkGrayishBlue">
            {["All", "Active", "Completed"].map((filter) => (
              <li>
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

      <ul className="md:hidden flex flex-row items-center justify-center gap-6 rounded-lg  dark:bg-bgBlueDark bg-lightGray p-4  dark:text-text-darkGrayishBlue">
        {["All", "Active", "Completed"].map((filter) => (
          <li>
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
    </div>
  );
}
