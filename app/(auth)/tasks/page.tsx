"use client";

import useTask from "../../../hooks/useTask";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAuthGuard from "../../../hooks/useAuthGuard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmModal from "../../components/ConfirmModal";
import TaskCard from "../../components/TaskCard";
import TaskForm from "../../components/TaskForm";
import TaskHeader from "../../components/TaskHeader";

export default function TasksPage() {
  const router = useRouter();
  const { user, loading } = useAuthGuard();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

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
    error,
    setError,
    loadingTasks,
    setShowConfirm,
    showConfirm,
  } = useTask();

  useEffect(() => {
    if (!user) return;

    getTasks();
  }, [user]);

  const handleEdit = (id: string) => {
    const selectedTask = tasks.find((item) => item.id === id);

    if (!selectedTask) return;

    setError("");
    setEditingId(id);
    setTask(selectedTask.task);
    setDescription(selectedTask.description);
  };

  const handleCancelEdit = () => {
    setError("");
    setEditingId(null);
    setTask("");
    setDescription("");
  };

  const handleDelete = (id: string) => {
    setTaskToDelete(id);
    setShowConfirm(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!task.trim()) {
      setError("Task is required.");
      return;
    }

    setError("");

    setSaving(true);

    if (editingId) {
      const success = await editTask(editingId, task, description);

      if (!success) {
        setSaving(false);
        return;
      }

      setEditingId(null);
      setTask("");
      setDescription("");

      await getTasks();
      setSaving(false);
      return;
    }

    await addTask(e);
    setSaving(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

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
        <TaskHeader handleLogout={handleLogout} />

        <div className="row g-4">
          {/* Add Task */}
          <TaskForm
            task={task}
            setTask={setTask}
            description={description}
            setDescription={setDescription}
            error={error}
            saving={saving}
            editingId={editingId}
            onSubmit={handleSubmit}
          />

          {/* Tasks */}
          <div className="col-12 col-lg-7">
            <div
              className="p-4 rounded-4"
              style={{
                background: "#121820",
                border: "1px solid #26313d",
              }}
            >
              {loadingTasks ? (
                <div className="text-center py-5">
                  <p className="mb-0" style={{ color: "#8793a1" }}>
                    Loading tasks...
                  </p>
                </div>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="h4 fw-bold mb-0">My Tasks</h2>

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
                      <p className="mb-1">No tasks yet.</p>

                      <small>Add your first task to get started.</small>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {tasks.map((item) => (
                        <TaskCard
                          key={item.id}
                          item={item}
                          editingId={editingId}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onCancelEdit={handleCancelEdit}
                        />
                      ))}

                      {/* Confirm Modal */}
                      {showConfirm && (
                        <ConfirmModal
                          onCancel={() => {
                            setShowConfirm(false);
                          }}
                          onConfirm={() => {
                            if (taskToDelete) {
                              deleteTask(taskToDelete);
                              setTaskToDelete(null);
                            }

                            setShowConfirm(false);
                          }}
                        />
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}