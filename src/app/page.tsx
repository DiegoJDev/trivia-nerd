import Link from "next/link";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import AuthButtons from "./components/AuthButtons";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            ¡Bienvenido de vuelta!
          </h2>
          <p className="text-gray-600 mb-6">
            Ya estás autenticado como {session.user?.name}
          </p>
          <Link href="/game">
            <button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-teal-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Continuar al Juego 🎮
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🧠 Trivia Nerd
          </h1>
          <p className="text-gray-600">
            Pon a prueba tus conocimientos y conviértete en un experto
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-4 mb-6">
          <AuthButtons session={session} />
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">o</span>
          </div>
        </div>

        {/* Guest Access */}
        <Link href="/game">
          <button className="w-full border-2 border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
            Continuar como Invitado
          </button>
        </Link>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Al continuar, aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
}
