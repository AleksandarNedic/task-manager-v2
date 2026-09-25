import Link from "next/link";

export default function HomePage() {
  return (
      <main>
        <h1>Task Management</h1>

        <div>
          <Link href="/login">
            <button>Login</button>
          </Link>

          <span> </span>

          <Link href="/register">
            <button>Register</button>
          </Link>
        </div>
      </main>
  );
}