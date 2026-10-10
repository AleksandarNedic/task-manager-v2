import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

type Task = {
  id: string;
  task: string;
  description: string;
  status: "pending" | "completed" | "in-progress";
  priority: "low" | "medium" | "high";
};

const getFirebaseErrorMessage = (error: unknown, action: string) => {
  const e = error as {
    code?: string;
  };

  switch (e.code) {
    case "permission-denied":
      return `You do not have permission to ${action}.`;

    case "unavailable":
      return "Network error. Please check your internet connection.";

    case "failed-precondition":
      return `Unable to ${action}. Please try again.`;

    default:
      return `Failed to ${action}. Please try again.`;
  }
};

export default function useTask() {
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const editTask = async (
    id: string,
    task: string,
    description: string,
    status: "pending" | "completed" | "in-progress",
    priority: "low" | "medium" | "high",
  ) => {
    const user = auth.currentUser;

    if (!user) return false;

    const taskRef = doc(db, "users", user.uid, "tasks", id);

    try {
      await updateDoc(taskRef, {
        task: task.trim(),
        description: description.trim(),
        status: status,
        priority: priority,
      });

      return true;
    } catch (error) {
      console.error("Failed to update task:", error);
      setError(getFirebaseErrorMessage(error, "update this task"));

      return false;
    }
  };

  const deleteTask = async (id: string) => {
    const user = auth.currentUser;

    if (!user) return;

    const taskRef = doc(db, "users", user.uid, "tasks", id);

    try {
      await deleteDoc(taskRef);

      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
      setError(getFirebaseErrorMessage(error, "delete this task"));
    }
  };

  const addTask = async (
    e: React.FormEvent<HTMLFormElement>,
    priority: "low" | "medium" | "high",
  ) => {
    e.preventDefault();

    const user = auth.currentUser;

    if (!user) return;

    setError("");

    const tasksCollection = collection(db, "users", user.uid, "tasks");

    try {
      const docRef = await addDoc(tasksCollection, {
        task: task.trim(),
        description: description.trim(),
        status: "pending",
        priority: priority,
      });

      const newTask: Task = {
        id: docRef.id,
        task: task.trim(),
        description: description.trim(),
        status: "pending",
        priority: priority,
      };

      setTasks((prev) => [...prev, newTask]);

      setTask("");
      setDescription("");
    } catch (error) {
      console.error("Failed to add task:", error);
      setError(getFirebaseErrorMessage(error, "add this task"));
    }
  };

  const getTasks = async () => {
    const user = auth.currentUser;

    if (!user) return;

    setError("");
    setLoadingTasks(true);

    const tasksCollection = collection(db, "users", user.uid, "tasks");

    try {
      const snapshot = await getDocs(tasksCollection);

      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      setTasks(tasksData);
    } catch (error) {
      console.error("Failed to load tasks:", error);
      setError(getFirebaseErrorMessage(error, "load your tasks"));
    } finally {
      setLoadingTasks(false);
    }
  };

  return {
    task,
    setTask,
    description,
    setDescription,
    tasks,
    addTask,
    deleteTask,
    getTasks,
    editTask,
    error,
    setError,
    setLoadingTasks,
    loadingTasks,
    setShowConfirm,
    showConfirm,
  };
}
