import {
  doc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { useGetUsersInfo } from "@/hooks/useGetUsersInfo";

export const useAddTodo = () => {
  const { userID } = useGetUsersInfo();

  const createFolder = async (folderName) => {
    try {
      const foldersCollectionRef = collection(db, "folders");

      const newFolderRef = await addDoc(foldersCollectionRef, {
        userID,
        todosLength: 0,
        name: folderName,
        createdAt: serverTimestamp(),
      });

      console.log(`Folder '${folderName}' created with ID: ${newFolderRef.id}`);
    } catch (error) {
      console.error("Error creating folder:", error.message);
    }
  };

  const addTodoToFolder = async (folderId, todoText) => {
    try {
      const folderDocRef = doc(db, "folders", folderId);

      const folderDoc = await getDoc(folderDocRef);
      const currentTodosLength = folderDoc.data()?.todosLength || 0;

      const todosCollectionRef = collection(folderDocRef, "todos");

      await addDoc(todosCollectionRef, {
        userID,
        todo: todoText,
        completed: false,
        createdAt: serverTimestamp(),
      });

      await updateDoc(folderDocRef, {
        todosLength: currentTodosLength + 1,
      });

      console.log("Todo added to folder successfully.");
    } catch (error) {
      console.error("Error adding todo to folder:", error.message);
    }
  };

  const toggleCompleted = async (el, folderId) => {
    const todoDocRef = doc(db, "folders", folderId, "todos", el?.id);

    try {
      await updateDoc(todoDocRef, {
        completed: !el?.completed,
      });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const updateTodo = async (id, updatedTodo, folderId) => {
    const todoDocRef = doc(db, "folders", folderId, "todos", id);

    try {
      await updateDoc(todoDocRef, {
        todo: updatedTodo,
      });
      console.log("Document successfully updated!");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const filterCompleted = async (todos, folderId) => {
    const todosCollectionRef = collection(db, "folders", folderId, "todos");

    const completedTodoIds = todos
      .filter((el) => el.completed)
      .map((item) => item.id);

    for (const todoId of completedTodoIds) {
      const todoDocRef = doc(todosCollectionRef, todoId);

      try {
        await deleteDoc(todoDocRef);
        console.log("Document successfully deleted: " + todoId);
      } catch (error) {
        console.error("Error deleting document: " + error);
      }
    }
  };

  const deletTodo = async (id, folderId) => {
    const folderDocRef = doc(db, "folders", folderId);

    const folderDoc = await getDoc(folderDocRef);
    const currentTodosLength = folderDoc.data()?.todosLength || 0;

    const todoDocRef = doc(db, "folders", folderId, "todos", id);

    try {
      await deleteDoc(todoDocRef);
      await updateDoc(folderDocRef, {
        todosLength: currentTodosLength - 1,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const removeTodoFolder = async (folderId) => {
    const folderRef = doc(db, "folders", folderId);

    try {
      await deleteDoc(folderRef);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    addTodoToFolder,
    toggleCompleted,
    deletTodo,
    filterCompleted,
    createFolder,
    removeTodoFolder,
    updateTodo,
  };
};
