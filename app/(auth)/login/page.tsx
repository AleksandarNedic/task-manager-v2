"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import useLogin from "../../../hooks/useLogin";

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const { login, error, loading } = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    await login(data.email, data.password);
  };

  return (
    <main
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "#0b0f14",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-11 col-sm-8 col-md-6 col-lg-4">
            <div
              className="p-4 p-md-5 rounded-4 shadow-lg"
              style={{
                background: "#121820",
                border: "1px solid #26313d",
              }}
            >
              <div className="text-center mb-4">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "#c7f000",
                    color: "#0b0f14",
                    fontSize: "24px",
                    fontWeight: "700",
                  }}
                >
                  T
                </div>

                <h1 className="fw-bold mb-2" style={{ color: "#f5f7fa" }}>
                  Welcome back
                </h1>

                <p className="mb-0" style={{ color: "#8793a1" }}>
                  Sign in to manage your tasks
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="form-label fw-semibold"
                    style={{ color: "#dce2e8" }}
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="form-control form-control-lg"
                    aria-invalid={!!errors.email}
                    {...registerField("email", {
                      required: "Email is required.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address.",
                      },
                    })}
                    style={{
                      background: "#0b0f14",
                      border: "1px solid #344150",
                      color: "#ffffff",
                    }}
                  />

                  {errors.email && (
                    <p className="text-danger small mt-1 mb-0">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="password"
                    className="form-label fw-semibold"
                    style={{ color: "#dce2e8" }}
                  >
                    Password
                  </label>

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="form-control form-control-lg"
                    aria-invalid={!!errors.password}
                    {...registerField("password", {
                      required: "Password is required.",
                    })}
                    style={{
                      background: "#0b0f14",
                      border: "1px solid #344150",
                      color: "#ffffff",
                    }}
                  />

                  {errors.password && (
                    <p className="text-danger small mt-1 mb-0">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}

                {loading && (
                  <div className="text-center mb-2">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-lg w-100 fw-bold mt-2"
                  style={{
                    background: "#c7f000",
                    border: "none",
                    color: "#0b0f14",
                  }}
                >
                  {loading ? "Logging in..." : "Login →"}
                </button>
              </form>

              <div className="text-center mt-4">
                <span style={{ color: "#687585" }}>
                  Don&apos;t have an account?{" "}
                </span>

                <Link
                  href="/register"
                  className="fw-semibold text-decoration-none"
                  style={{ color: "#c7f000" }}
                >
                  Register
                </Link>
              </div>

              <div className="text-center mt-3">
                <small style={{ color: "#687585" }}>Task Manager</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
