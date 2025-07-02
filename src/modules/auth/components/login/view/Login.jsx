import { useLoginForm } from "../viewmodel/useLoginForm";

export default function Login() {
    const {
        correo,
        setCorreo,
        clave,
        setClave,
        error,
        handleSubmit,
    } = useLoginForm();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded shadow-md w-full max-w-sm"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
            <input
              type="email"
              placeholder="Correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
              className="w-full p-2 border rounded mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Login
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </div>
      );      
}
