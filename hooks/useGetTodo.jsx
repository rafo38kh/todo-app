import { useState, useEffect } from "react";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useGetUsersInfo } from "./useGetUsersInfo";
import { onSnapshot, orderBy } from "firebase/firestore";

export const useGetTodo = () => {
  const [todos, setTodos] = useState([]);

  const todoCollectionRef = collection(db, "todos");
  const { userID } = useGetUsersInfo();

  const getTodos = async () => {
    let unsubscribe;
    try {
      const queryTodos = query(
        todoCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTodos, (snapshot) => {
        const docs = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });
        });
        setTodos(docs);
      });
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getTodos();
  }, []);
  return { todos };
};
