"use client";

import { useState } from "react";
import useRegister from "@/hooks/useRegister";

export default function RegisterPage() {
    const { register, error } = useRegister();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: any) => {
        e.preventDefault();

        await register(email, password);
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
                                    +
                                </div>

                                <h1
                                    className="fw-bold mb-2"
                                    style={{ color: "#f5f7fa" }}
                                >
                                    Create account
                                </h1>

                                <p
                                    className="mb-0"
                                    style={{ color: "#8793a1" }}
                                >
                                    Start managing your tasks
                                </p>
                            </div>

                            <form onSubmit={handleRegister}>
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
                                        placeholder="Create a password"
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
                                    Create account →
                                </button>
                            </form>

                            <div className="text-center mt-4">
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
