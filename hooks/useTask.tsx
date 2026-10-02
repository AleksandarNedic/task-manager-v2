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
};

export default function useTask() {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [error, setError] = useState("");

    const editTask = async (
        id: string,
        task: string,
        description: string
    ) => {
        const user = auth.currentUser;

        if (!user) return false;

        const taskRef = doc(db, "users", user.uid, "tasks", id);

        try {
            await updateDoc(taskRef, {
                task: task,
                description: description,
            });

            return true;
        } catch (error) {
            console.error("Failed to update task:", error);
            setError("Failed to update task. Please try again.");

            return false;
        }
    };

    const deleteTask = async (id: string) => {
        const user = auth.currentUser;

        if (!user) return;

        const taskRef = doc(
            db,
            "users",
            user.uid,
            "tasks",
            id
        );

        try {
            await deleteDoc(taskRef);

            setTasks(tasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Failed to delete task:", error);
            setError("Failed to delete task. Please try again.");
        }
    };

    const addTask = async (e: any) => {
        e.preventDefault();

        const user = auth.currentUser;

        if (!user) return;

        if (!task.trim()) {
            setError("Please enter a task title.");
            return;
        }

        setError("");

        const tasksCollection = collection(
            db,
            "users",
            user.uid,
            "tasks"
        );

        try {
            const docRef = await addDoc(tasksCollection, {
                task,
                description,
            });

            const newTask = {
                id: docRef.id,
                task,
                description,
            };

            setTasks([...tasks, newTask]);

            setTask("");
            setDescription("");
        } catch (error) {
            console.error("Failed to add task:", error);
            setError("Failed to add task. Please try again.");
        }
    };

    const getTasks = async () => {
        const user = auth.currentUser;

        if (!user) return;

        const tasksCollection = collection(
            db,
            "users",
            user.uid,
            "tasks"
        );

        try {
            const snapshot = await getDocs(tasksCollection);

            const tasksData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Task[];

            setTasks(tasksData);
        } catch (error) {
            console.error("Failed to load tasks:", error);
            setError("Failed to load tasks. Please try again.");
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
    };
}