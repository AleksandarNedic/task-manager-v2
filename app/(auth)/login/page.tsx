
"use client";

import { useState } from "react";
import Link from "next/link";
import useLogin from "../../../hooks/useLogin";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { login, error } = useLogin();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        await login(email, password);
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

                                <h1
                                    className="fw-bold mb-2"
                                    style={{ color: "#f5f7fa" }}
                                >
                                    Welcome back
                                </h1>

                                <p
                                    className="mb-0"
                                    style={{ color: "#8793a1" }}
                                >
                                    Sign in to manage your tasks
                                </p>
                            </div>

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="email"
                                        className="form-label fw-semibold"
                                        style={{ color: "#dce2e8" }}
                                    >
                                        Email
                                    </label>

                                    <input
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
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
                                        htmlFor="password"
                                        className="form-label fw-semibold"
                                        style={{ color: "#dce2e8" }}
                                    >
                                        Password
                                    </label>

                                    <input
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="form-control form-control-lg"
                                        style={{
                                            background: "#0b0f14",
                                            border: "1px solid #344150",
                                            color: "#ffffff",
                                        }}
                                    />
                                </div>

                                {error && (
                                    <div className="alert alert-danger py-2">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-lg w-100 fw-bold mt-2"
                                    style={{
                                        background: "#c7f000",
                                        border: "none",
                                        color: "#0b0f14",
                                    }}
                                >
                                    Login →
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <span style={{ color: "#687585" }}>
                                   Don&apos;t have an account?
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
                                <small style={{ color: "#687585" }}>
                                    Task Manager
                                </small>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}
