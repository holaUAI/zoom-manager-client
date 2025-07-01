import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useSetAtom } from "jotai";
import { authAtom } from "../atoms/authAtom";

export const useLogin = () => {
    const setAuth = useSetAtom(authAtom);

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        setAuth({
            isAuthenticated: true,
            user: {
                uid: user.uid,
                email: user.email,
            }
        });
        return user;
    };

    return { login };
};