type TaskStatus = "pending" | "completed" | "in-progress";

type TaskCardProps = {
  item: {
    id: string;
    task: string;
    description: string;
    status: TaskStatus;
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

  const currentStatus = statusStyles[item.status];

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
