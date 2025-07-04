export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validateLoginForm = ({ correo, clave }) => {
    const errors = {};

    if (!correo) {
        errors.correo = 'El correo es obligatorio';
    } else if (!validateEmail(correo)) {
        errors.correo = 'Correo inválido';
    }

    if (!clave) {
        errors.clave = 'La contraseña es obligatoria';
    }

    return errors;
};
