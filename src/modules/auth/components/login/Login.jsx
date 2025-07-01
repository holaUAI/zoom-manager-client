import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(correo, clave);
            navigate("/");
        } catch (err) {
            setError("Correo o contraseña inválidos");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>
                <input
                    type="email"
                    placeholder="Correo"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    required
                />
                <button type="submit">Ingresar</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
}
