"use client";
import { signIn, signOut } from "next-auth/react";
import type { Session } from "next-auth";
import { FaGoogle, FaLinkedin, FaGithub } from "react-icons/fa";
import Image from "next/image";

interface AuthButtonsProps {
  session?: Session | null;
}

export default function AuthButtons({ session }: AuthButtonsProps) {
  if (session) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex-shrink-0">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="Profile"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                {session.user?.name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-800">
              {session.user?.name}
            </p>
            <p className="text-xs text-green-600 truncate">
              {session.user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => signOut()}
          className="w-full bg-red-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-red-600 transition-all duration-300"
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Google */}
      <button
        onClick={() => signIn("google", { callbackUrl: "/game" })}
        className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all duration-300 group"
      >
        <FaGoogle className="text-red-500 text-xl group-hover:scale-110 transition-transform" />
        <span>Continuar con Google</span>
      </button>

      {/* LinkedIn */}
      <button
        onClick={() => signIn("linkedin", { callbackUrl: "/game" })}
        className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 group"
      >
        <FaLinkedin className="text-blue-600 text-xl group-hover:scale-110 transition-transform" />
        <span>Continuar con LinkedIn</span>
      </button>

      {/* GitHub */}
      <button
        onClick={() => signIn("github", { callbackUrl: "/game" })}
        className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:border-gray-800 hover:bg-gray-50 transition-all duration-300 group"
      >
        <FaGithub className="text-gray-800 text-xl group-hover:scale-110 transition-transform" />
        <span>Continuar con GitHub</span>
      </button>
    </div>
  );
}
