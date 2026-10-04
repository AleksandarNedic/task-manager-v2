type TaskHeaderProps = {
  handleLogout: () => void;
};

export default function TaskHeader({ handleLogout }: TaskHeaderProps) {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h1 className="fw-bold mb-1">
            Task<span style={{ color: "#c7f000" }}>.</span>
          </h1>

          <p className="mb-0" style={{ color: "#8793a1" }}>
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

      <div className="row g-4"></div>
    </div>
  );
}
