'use client';
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/dashboard",
    });
    setLoading(false);
    if (res?.error) setError("Invalid credentials");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative"
        autoComplete="off"
      >
        <div className="mb-6 flex flex-col items-center w-full">
          <Link href="/">
            <Image
              src="/assets/logo.jpg"
              alt="Logo"
              width={80}
              height={80}
              className="mx-auto rounded-full mb-2"
              priority
            />
          </Link>
          <h1 className="text-2xl font-bold mb-2 text-center">Sign in to your account</h1>
        </div>
        <div className="w-full flex flex-col gap-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full py-2 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition flex items-center justify-center"
          disabled={loading}
          style={{ position: 'relative', zIndex: 1 }}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
        {/* Cover the sign-in button with the logo visually */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          opacity: 0.15,
          zIndex: 2,
        }}>
          <Image src="/assets/logo.jpg" alt="Logo Overlay" width={120} height={120} className="rounded-full" />
        </div>
      </form>
      <p className="mt-8 text-xs text-gray-400 text-center">
        Powered by <span className="font-semibold">Verbum Networks</span>
      </p>
    </div>
  );
}
