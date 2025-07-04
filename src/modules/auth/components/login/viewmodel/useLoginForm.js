import { useState } from "react";
import { useLogin } from "../../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { validateLoginForm } from "../../../utils/authValidators";

export function useLoginForm() {
    const [correo, setCorreo] = useState("");
    const [clave, setClave] = useState("");
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { login } = useLogin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const validationErrors = validateLoginForm({ correo, clave });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

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
        error, errors,
        handleSubmit,
        showPassword, setShowPassword
    };
}
