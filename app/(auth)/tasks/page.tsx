
"use client";



import useTask from "../../../hooks/useTask";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAuthGuard from '../../../hooks/useAuthGuard'
import {useRouter} from "next/navigation";
import { useEffect, useState } from "react";


export default function TasksPage() {
    const router = useRouter();
    const {user, loading} = useAuthGuard()
    const [editingId, setEditingId] = useState<string | null>(null);

    const {
        setTask,
        setDescription,
        tasks,
        addTask,
        task,
        description,
        deleteTask,
        editTask,
        getTasks,
    } = useTask();

    useEffect(() => {
        if (!user) return;
        getTasks().catch((error) => {
            console.error("Failed to load tasks:", error);
        });
    }, [user]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingId) {
            await editTask(editingId, task, description);

            setEditingId(null);
            setTask("");
            setDescription("");

            await getTasks();
            return;
        }

        await addTask(e);
    };

    const handleLogout = async () => {
        await signOut(auth)
        router.push("/login")

    }

    if (loading) {
        return null;
    }

    return (
        <main
            className="min-vh-100 py-5"
            style={{
                background: "#0b0f14",
                color: "#f5f7fa",
            }}
        >
            <div className="container">
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                        <h1 className="fw-bold mb-1">
                            Task<span style={{ color: "#c7f000" }}>.</span>
                        </h1>

                        <p
                            className="mb-0"
                            style={{ color: "#8793a1" }}
                        >
                            Manage your tasks and stay productive.
                        </p>
                    </div>


                        <button
                            onClick={handleLogout}
                            type="button"
                            className="btn fw-semibold"
                            style={{
                                background: "#1a222c",
                                color: "#f5f7fa",
                                border: "1px solid #344150",
                            }}
                        >
                            Logout
                        </button>

                </div>

                <div className="row g-4">
                    {/* Add Task */}
                    <div className="col-12 col-lg-5">
                        <div
                            className="p-4 rounded-4 h-100"
                            style={{
                                background: "#121820",
                                border: "1px solid #26313d",
                            }}
                        >
                            <h2 className="h4 fw-bold mb-4">
                                Add a new task
                            </h2>

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="task"
                                        className="form-label fw-semibold"
                                        style={{ color: "#dce2e8" }}
                                    >
                                        Task
                                    </label>

                                    <input
                                        value={task}
                                        onChange={(e) =>
                                            setTask(e.target.value)
                                        }
                                        id="task"
                                        type="text"
                                        placeholder="What needs to be done?"
                                        className="form-control form-control-lg"
                                        style={{
                                            background: "#0b0f14",
                                            border: "1px solid #344150",
                                            color: "#ffffff",
                                        }}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="description"
                                        className="form-label fw-semibold"
                                        style={{ color: "#dce2e8" }}
                                    >
                                        Description
                                    </label>

                                    <textarea
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                        id="description"
                                        placeholder="Add some details..."
                                        rows={5}
                                        className="form-control"
                                        style={{
                                            background: "#0b0f14",
                                            border: "1px solid #344150",
                                            color: "#ffffff",
                                        }}
                                    />
                                </div>

                                <button
                                   
                                    type="submit"
                                    className="btn btn-lg w-100 fw-bold"
                                    style={{
                                        background: "#c7f000",
                                        border: "none",
                                        color: "#0b0f14",
                                    }}
                                >
                                    {editingId ? "Save Changes" : "+ Add Task"}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Tasks */}
                    <div className="col-12 col-lg-7">
                        <div
                            className="p-4 rounded-4"
                            style={{
                                background: "#121820",
                                border: "1px solid #26313d",
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="h4 fw-bold mb-0">
                                    My Tasks
                                </h2>

                                <span
                                    className="badge rounded-pill"
                                    style={{
                                        background: "#c7f000",
                                        color: "#0b0f14",
                                    }}
                                >
                                    {tasks.length}
                                </span>
                            </div>

                            {tasks.length === 0 ? (
                                <div
                                    className="text-center py-5"
                                    style={{ color: "#687585" }}
                                >
                                    <p className="mb-1">
                                        No tasks yet.
                                    </p>

                                    <small>
                                        Add your first task to get started.
                                    </small>
                                </div>
                            ) : (
                                <div className="d-flex flex-column gap-3">
                                    {tasks.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-3 rounded-3"
                                            style={{
                                                background: "#0b0f14",
                                                border: "1px solid #26313d",
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-start gap-3">
                                                <div>
                                                    <h3 className="h5 fw-bold mb-1">
                                                        {item.task}
                                                    </h3>

                                                    <p
                                                        className="mb-0"
                                                        style={{
                                                            color: "#8793a1",
                                                        }}
                                                    >
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setEditingId(item.id);
                                                            setTask(item.task);
                                                            setDescription(item.description);
                                                        }}
                                                        type="button"
                                                        className="btn btn-sm btn-outline-success"
                                                    >
                                                        Edit
                                                    </button>

                                                    {editingId ? (<button
                                                        type="button"
                                                        onClick={() =>
                                                        {
                                                            setEditingId(null);
                                                            setTask("");
                                                            setDescription("");
                                                        }

                                                        }
                                                        className="btn btn-sm btn-outline-success"
                                                        style={{
                                                            color: "#ff6b6b",
                                                            border: "1px solid #3a2529",
                                                            background: "#1b1316",
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>) : (<button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteTask(item.id)
                                                        }
                                                        className="btn btn-sm"
                                                        style={{
                                                            color: "#ff6b6b",
                                                            border: "1px solid #3a2529",
                                                            background: "#1b1316",
                                                        }}
                                                    >
                                                        Delete
                                                    </button>) }
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
