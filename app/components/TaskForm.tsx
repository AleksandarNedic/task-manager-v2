type TaskStatus = "pending" | "completed" | "in-progress";
type TaskPriority = "low" | "medium" | "high";

type TaskFormProps = {
  task: string;
  setTask: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  status: TaskStatus;
  setStatus: (value: TaskStatus) => void;
  priority: TaskPriority;
  setPriority: (value: TaskPriority) => void;
  error: string;
  saving: boolean;
  editingId: string | null;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function TaskForm({
  task,
  setTask,
  description,
  setDescription,
  status,
  setStatus,
  priority,
  setPriority,
  error,
  saving,
  editingId,
  onSubmit,
}: TaskFormProps) {
  return (
    <div className="col-12 col-lg-5">
      <div
        className="p-4 rounded-4 h-100"
        style={{
          background: "#121820",
          border: "1px solid #26313d",
        }}
      >
        <h2 className="h4 fw-bold mb-4">Add a new task</h2>

        <form onSubmit={onSubmit}>
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
              onChange={(e) => setTask(e.target.value)}
              id="task"
              type="text"
              maxLength={25}
              placeholder="What needs to be done?"
              className="form-control form-control-lg"
              style={{
                background: "#0b0f14",
                border: "1px solid #344150",
                color: "#ffffff",
              }}
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="description"
              className="form-label fw-semibold"
              style={{ color: "#dce2e8" }}
            >
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              maxLength={250}
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

          <div className="mb-3">
            <label
              htmlFor="status"
              className="form-label fw-semibold"
              style={{ color: "#dce2e8" }}
            >
              Status
            </label>

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              id="status"
              className="form-select form-select-lg"
              style={{
                background: "#0b0f14",
                border: "1px solid #344150",
                color: "#ffffff",
              }}
            >
              <option value="pending">🟡 Pending</option>
              <option value="in-progress">🔵 In Progress</option>
              <option value="completed">🟢 Completed</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="priority"
              className="form-label fw-semibold"
              style={{ color: "#dce2e8" }}
            >
              Priority
            </label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              id="priority"
              className="form-select form-select-lg"
              style={{
                background: "#0b0f14",
                border: "1px solid #344150",
                color: "#ffffff",
              }}
            >
              <option value="low">🟢 Low</option>
              <option value="medium">🟡 Medium</option>
              <option value="high">🔴 High</option>
            </select>
          </div>

          {error && (
            <div
              className="mb-4 px-3 py-2 rounded-3"
              style={{
                background: "#1a222c",
                border: "1px solid #344150",
                color: "#ff6b6b",
                fontSize: "0.9rem",
              }}
            >
              {error}
            </div>
          )}

          <button
            disabled={saving}
            type="submit"
            className="btn btn-lg w-100 fw-bold"
            style={{
              background: "#c7f000",
              border: "none",
              color: "#0b0f14",
            }}
          >
            {saving ? "Saving..." : editingId ? "Save Changes" : "+ Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
}
