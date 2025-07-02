import { useLoginForm } from "../viewmodel/useLoginForm";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const {
    correo, setCorreo,
    clave, setClave,
    error, errors,
    handleSubmit,
    showPassword, setShowPassword
  } = useLoginForm();

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl w-full max-w-md border border-white/20"
      >
        {/* Logo */}
        <div className="flex justify-center mb-15">
          <img
            src="/tutor.IA.png"
            alt="Tutor.IA"
            className="h-18 w-auto object-contain"
          />
        </div>
        {/* Email */}
        <div className="relative mb-4">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
            className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 ${errors.correo ? "border-red-500" : "border-gray-200"
              }`}
          />
          {errors.correo && (
            <p className="mt-1 text-sm text-red-500">{errors.correo}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
            className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 ${errors.clave ? "border-red-500" : "border-gray-200"
              }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
          {errors.clave && (
            <p className="mt-1 text-sm text-red-500">{errors.clave}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-200 transform hover:scale-[1.02] flex items-center justify-center space-x-2"
        >
          <span>Iniciar Sesión</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}
      </form>
    </div>
  );
}
