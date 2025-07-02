import { useState } from "react";
import { useLogin } from "../../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
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

    return {
        correo, setCorreo,
        clave, setClave,
        error,
        handleSubmit,
    };
};
