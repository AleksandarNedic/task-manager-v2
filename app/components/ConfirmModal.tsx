type ConfirmModalProps = {
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmModal({
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        background: "rgba(0, 0, 0, 0.65)",
        zIndex: 1050,
      }}
    >
      <div
        className="p-4 rounded-4 shadow-lg text-center"
        style={{
          width: "90%",
          maxWidth: "400px",
          background: "#121820",
          border: "1px solid #26313d",
        }}
      >
        <h3 className="h5 fw-bold mb-3" style={{ color: "#f5f7fa" }}>
          Delete task?
        </h3>

        <p className="mb-4" style={{ color: "#8793a1" }}>
          Are you sure you want to delete this task?
        </p>

        <div className="d-flex justify-content-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline-light px-4"
          >
            No
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="btn btn-danger px-4"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
