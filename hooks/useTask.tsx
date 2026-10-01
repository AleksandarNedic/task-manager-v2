import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";

type Task = {
    id: string;
    task: string;
    description: string;
};

export default function useTask() {
    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [tasks, setTasks] = useState<Task[]>([]);

    const editTask = async (
        id: string,
        task: string,
        description: string

    ) => {
        const user = auth.currentUser;
        if (!user) return;

        const taskRef = doc(db, "users", user.uid, "tasks", id);

        await updateDoc(taskRef, {
            task: task,
            description: description,
        });

    }



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

        await deleteDoc(taskRef);

        setTasks(tasks.filter((task) => task.id !== id));
    };

    const addTask = async (e: any) => {
        e.preventDefault();

        const user = auth.currentUser;

        if (!user) return;

        const tasksCollection = collection(
            db,
            "users",
            user.uid,
            "tasks"
        );

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

        const snapshot = await getDocs(tasksCollection);

        const tasksData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as Task[];

        setTasks(tasksData);
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
       
    };
}