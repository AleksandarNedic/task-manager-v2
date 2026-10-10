"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import useRegister from "@/hooks/useRegister";
import { useRouter } from "next/navigation";

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const inputStyle = {
  background: "#0b0f14",
  border: "1px solid #344150",
  color: "#ffffff",
};

const labelStyle = { color: "#dce2e8" };

export default function RegisterPage() {
  const { register, error } = useRegister();
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const {
    register: registerField,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    const result = await register(data.email, data.password);

    if (result === true) {
      setSuccess(true);
    }
  };

  return (
    <main
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "#0b0f14" }}
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
                  +
                </div>

                <h1 className="fw-bold mb-2" style={{ color: "#f5f7fa" }}>
                  Create Account
                </h1>

                <p className="mb-0" style={{ color: "#8793a1" }}>
                  Start managing your tasks
                </p>
              </div>

              {success ? (
                <div className="text-center">
                  <div
                    className="mb-4 px-3 py-3 rounded-3"
                    style={{
                      background: "#162000",
                      border: "1px solid #c7f000",
                      color: "#c7f000",
                    }}
                  >
                    Account created successfully. You can now log in.
                  </div>

                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="btn btn-lg w-100 fw-bold"
                    style={{
                      background: "#c7f000",
                      border: "none",
                      color: "#0b0f14",
                    }}
                  >
                    Go to login →
                  </button>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label fw-semibold"
                        style={labelStyle}
                      >
                        Email
                      </label>

                      <input
                        {...registerField("email", {
                          required: "Email is required.",
                          pattern: {
                            value: /^\S+@\S+\.\S+$/,
                            message: "Please enter a valid email address.",
                          },
                        })}
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        className="form-control form-control-lg"
                        style={inputStyle}
                      />

                      {errors.email && (
                        <p className="text-danger mt-2 mb-0">
                          {errors.email.message}
                        </p>
                      )}

                      {!errors.email && error && (
                        <p className="text-danger mt-2 mb-0">{error}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="password"
                        className="form-label fw-semibold"
                        style={labelStyle}
                      >
                        Password
                      </label>

                      <input
                        {...registerField("password", {
                          required: "Password is required.",
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long.",
                          },
                          validate: {
                            uppercase: (value) =>
                              /[A-Z]/.test(value) ||
                              "Password must contain at least one uppercase letter.",
                            lowercase: (value) =>
                              /[a-z]/.test(value) ||
                              "Password must contain at least one lowercase letter.",
                            number: (value) =>
                              /[0-9]/.test(value) ||
                              "Password must contain at least one number.",
                            special: (value) =>
                              /[^A-Za-z0-9]/.test(value) ||
                              "Password must contain at least one special character.",
                          },
                        })}
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Create a password"
                        className="form-control form-control-lg"
                        style={inputStyle}
                      />

                      {errors.password && (
                        <p className="text-danger mt-2 mb-0">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="confirmPassword"
                        className="form-label fw-semibold"
                        style={labelStyle}
                      >
                        Confirm Password
                      </label>

                      <input
                        {...registerField("confirmPassword", {
                          required: "Please confirm your password.",
                          validate: (value) =>
                            value === getValues("password") ||
                            "Passwords do not match.",
                        })}
                        id="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Confirm your password"
                        className="form-control form-control-lg"
                        style={inputStyle}
                      />

                      {errors.confirmPassword && (
                        <p className="text-danger mt-2 mb-0">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-lg w-100 fw-bold mt-2"
                      style={{
                        background: "#c7f000",
                        border: "none",
                        color: "#0b0f14",
                      }}
                    >
                      {isSubmitting ? "Creating..." : "Create account →"}
                    </button>
                  </form>

                  <div className="text-center mt-4">
                    <span style={{ color: "#687585" }}>
                      Already have an account?{" "}
                    </span>

                    <button
                      type="button"
                      onClick={() => router.push("/login")}
                      className="btn btn-link p-0"
                      style={{
                        color: "#c7f000",
                        textDecoration: "none",
                      }}
                    >
                      Log in
                    </button>
                  </div>
                </>
              )}

              <div className="text-center mt-4">
                <small style={{ color: "#687585" }}>Task Manager</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
