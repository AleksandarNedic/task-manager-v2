type TaskStatus = "pending" | "completed" | "in-progress";
type TaskPriority = "low" | "medium" | "high";

type TaskCardProps = {
  item: {
    id: string;
    task: string;
    description: string;
    status: TaskStatus;
    priority?: TaskPriority;
  };
  editingId: string | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCancelEdit: () => void;
};

export default function TaskCard({
  item,
  editingId,
  onEdit,
  onDelete,
  onCancelEdit,
}: TaskCardProps) {
  const statusStyles = {
    pending: {
      background: "#3d3212",
      color: "#f5c542",
      text: "🟡 Pending",
    },
    "in-progress": {
      background: "#132c46",
      color: "#4da3ff",
      text: "🔵 In Progress",
    },
    completed: {
      background: "#16351f",
      color: "#4ade80",
      text: "🟢 Completed",
    },
  };

  const priorityStyles = {
    low: {
      background: "#16351f",
      color: "#4ade80",
      text: "🟢 Low",
    },
    medium: {
      background: "#3d3212",
      color: "#f5c542",
      text: "🟡 Medium",
    },
    high: {
      background: "#3b1717",
      color: "#ff6b6b",
      text: "🔴 High",
    },
  };

  const currentStatus = statusStyles[item.status];
  const currentPriority = item.priority
    ? priorityStyles[item.priority]
    : priorityStyles.medium;

  return (
    <div
      key={item.id}
      className="p-3 rounded-3"
      style={{
        background: "#0b0f14",
        border: "1px solid #26313d",
      }}
    >
      <div className="d-flex justify-content-between align-items-start gap-3">
        <div className="flex-grow-1" style={{ minWidth: 0 }}>
          <h3 className="h5 fw-bold mb-1">{item.task}</h3>

          <p
            className="mb-2"
            style={{
              color: "#8793a1",
              overflowWrap: "anywhere",
            }}
          >
            {item.description}
          </p>

          <div className="d-flex flex-wrap gap-2">
            <span
              className="badge rounded-pill"
              style={{
                background: currentStatus.background,
                color: currentStatus.color,
                fontWeight: 600,
              }}
            >
              {currentStatus.text}
            </span>

            <span
              className="badge rounded-pill"
              style={{
                background: currentPriority.background,
                color: currentPriority.color,
                fontWeight: 600,
              }}
            >
              {currentPriority.text}
            </span>
          </div>
        </div>

        <div className="d-flex gap-2">
          <button
            onClick={() => onEdit(item.id)}
            type="button"
            className="btn btn-sm btn-outline-success"
          >
            Edit
          </button>

          {editingId ? (
            <button
              type="button"
              onClick={onCancelEdit}
              className="btn btn-sm btn-outline-danger"
            >
              Cancel
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onDelete(item.id)}
              className="btn btn-sm btn-outline-danger"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
