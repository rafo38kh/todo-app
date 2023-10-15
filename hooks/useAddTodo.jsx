import {
  addDoc,
  collection,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { useGetUsersInfo } from "@/hooks/useGetUsersInfo";

export const useAddTodo = () => {
  const todoCollectionRef = collection(db, "todos");
  const { userID } = useGetUsersInfo();

  const addTodo = async ({ text, isTodo }) => {
    await addDoc(todoCollectionRef, {
      text,
      isTodo,
      userID,
      createdAt: serverTimestamp(),
    });
  };

  const toggleCompleted = async (el) => {
    const docRef = doc(db, "todos", el.id);

    try {
      await updateDoc(docRef, {
        completed: !el.completed,
      });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  //   const filterCompleted = async (todos) => {
  //     const todoDoc = doc(db, "todos", completed);

  //     todos
  //       .filter((el) => el.completed)
  //       .map((item) => item.id)
  //       .forEach(item => await deleteDoc(item));
  //   };

  const filterCompleted = async (todos) => {
    const todoCollectionRef = collection(db, "todos");

    const completedTodoIds = todos
      .filter((el) => el.completed)
      .map((item) => item.id);

    for (const todoId of completedTodoIds) {
      const todoDocRef = doc(todoCollectionRef, todoId);

      try {
        await deleteDoc(todoDocRef);
        console.log("Document successfully deleted: " + todoId);
      } catch (error) {
        console.error("Error deleting document: " + error);
      }
    }
  };

  const deletTodo = async (id) => {
    const todoDoc = doc(db, "todos", id);
    try {
      await deleteDoc(todoDoc);
    } catch (err) {
      console.error(err);
    }
  };

  return { addTodo, toggleCompleted, deletTodo, filterCompleted };
};
