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

type TaskStatus = "pending" | "completed" | "in-progress";
type TaskPriority = "low" | "medium" | "high";

export default function TasksPage() {
  const router = useRouter();
  const { user, loading } = useAuthGuard();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [status, setStatus] = useState<TaskStatus>("pending");
  const [priority, setPriority] = useState<TaskPriority>("medium");
  const [searchTask, setSearchTask] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.task.toLowerCase().includes(searchTask.toLowerCase()) &&
      (filterStatus === "all" || task.status === filterStatus),
  );

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTask(e.target.value);
  };

  const handleEdit = (id: string) => {
    const selectedTask = tasks.find((item) => item.id === id);

    if (!selectedTask) return;

    setError("");
    setEditingId(id);
    setTask(selectedTask.task);
    setDescription(selectedTask.description);
    setStatus(selectedTask.status);
    setPriority(selectedTask.priority ?? "medium");
  };

  const handleCancelEdit = () => {
    setError("");
    setEditingId(null);
    setTask("");
    setDescription("");
    setStatus("pending");
    setPriority("medium");
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

    if (task.trim().length > 100) {
      setError("Task title must be 100 characters or less.");
      return;
    }

    if (description.trim().length > 500) {
      setError("Description must be 500 characters or less.");
      return;
    }

    setError("");

    setSaving(true);

    if (editingId) {
      const success = await editTask(
        editingId,
        task,
        description,
        status,
        priority,
      );

      if (!success) {
        setSaving(false);
        return;
      }

      setEditingId(null);
      setTask("");
      setDescription("");
      setStatus("pending");
      setPriority("medium");

      await getTasks();
      setSaving(false);
      return;
    }

    await addTask(e, priority);
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
        <TaskHeader
          handleLogout={handleLogout}
          handleSearchInput={handleSearchInput}
        />

        <div className="row g-4">
          {/* Add Task */}
          <TaskForm
            task={task}
            setTask={setTask}
            description={description}
            setDescription={setDescription}
            status={status}
            setStatus={setStatus}
            priority={priority}
            setPriority={setPriority}
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
              {/* Tasks Header */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h2 className="h4 fw-bold mb-0">My Tasks</h2>

                <div className="d-flex align-items-center gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="form-select"
                    style={{
                      width: "130px",
                      background: "#1a222c",
                      color: "#f5f7fa",
                      border: "1px solid #344150",
                      fontSize: "14px",
                    }}
                  >
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>

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
              </div>

              {loadingTasks ? (
                <div className="text-center py-5">
                  <p className="mb-0" style={{ color: "#8793a1" }}>
                    Loading tasks...
                  </p>
                </div>
              ) : (
                <>
                  {tasks.length === 0 ? (
                    <div
                      className="text-center py-5"
                      style={{ color: "#687585" }}
                    >
                      <p className="mb-1">No tasks yet.</p>

                      <small>Add your first task to get started.</small>
                    </div>
                  ) : filteredTasks.length === 0 ? (
                    <div
                      className="text-center py-5"
                      style={{ color: "#687585" }}
                    >
                      <p className="mb-1">No tasks found.</p>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {filteredTasks.map((item) => (
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
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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
    </main>
  );
}
