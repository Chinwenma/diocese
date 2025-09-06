
'use client';
import Image from "next/image";
import { signOut } from "next-auth/react";

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center relative">
        <div className="mb-6 flex flex-col items-center w-full">
          <Image
            src="/assets/logo.jpg"
            alt="Logo"
            width={80}
            height={80}
            className="mx-auto rounded-full mb-2"
            priority
          />
          <h1 className="text-2xl font-bold mb-2 text-center">Confirm Sign Out</h1>
        </div>
        <p className="text-gray-500 mb-6 text-center text-sm">
          Are you sure you want to sign out?
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/signin" })}
          className="w-full py-2 px-4 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-medium transition text-center"
        >
          Yes, Sign Me Out
        </button>
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
      </div>
      <p className="mt-8 text-xs text-gray-400 text-center">
        Powered by <span className="font-semibold">Verbum networks</span>
      </p>
    </div>
  );
}
